const User = require('../models/registration.model');
const Helper = require('../helper/helper');
const mongoose = require('mongoose');
const Follow = require('../models/followModel');

exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password').lean();
        if (!user) {
            return res.status(404).json({ status: false, message: 'User Not Found', data: {} });
        }
        const data = user;
        return res.status(200).json({ status: true, message: 'User profile retrieved successfully ✅', data });
    } catch (err) {
        console.error('Error in getProfile:', err.message);
        return res.status(500).json({ status: false, message: 'Server Error', data: {} });
        next(err);
    }
};

exports.UpdateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, mobile, userName, bio, image } = req.body;
        let errors = {};
        let hasError = false;


        if (hasError) {
            return res.status(400).json({
                status: false,
                message: 'Required fields are missing',
                errors: errors,
                data: {}
            });
        }

        if (!Helper.validateMobile(mobile)) {
            return res.status(400).json({ status: false, message: 'Invalid mobile number', data: {} });
        }

        const updateData = { name, mobile, userName, bio };


        updateData.image = image;

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, lean: true }).lean();

        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'User not found', data: {} });
        }

        const data = updatedUser;
        return res.status(200).json({ status: true, message: 'User updated successfully ✅', data });
    } catch (err) {
        console.error('Error in UpdateProfile:', err.message);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
        next(err);
    }
};

exports.getAllUserName = async (req, res, next) => {
    try {
        const { userName, name } = req.body;
        const queryObject = {};

        if (userName) {
            queryObject.userName = userName;
        }

        if (name) {
            queryObject.name = name;
        }

        const AllUserName = await User.find(queryObject);

        const data = AllUserName;
        return res.status(200).json({ status: true, message: 'Get All Users', data });

    } catch (err) {
        console.error('Error in getProfile:', err.message);
        return res.status(500).json({ status: false, message: 'Server Error', data: {} });
        next(err);
    }

};

exports.getProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const currentUserId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: false, message: 'Invalid User ID' });
        }

        const user = await User.findById(userId).select('-password').lean();
        if (!user) {
            return res.status(404).json({ status: false, message: 'User Not Found' });
        }

        const followData = await Follow.aggregate([
            {
                $facet: {
                    followingCount: [
                        { $match: { follower: new mongoose.Types.ObjectId(userId) } },
                        { $count: "count" }
                    ],
                    followerCount: [
                        { $match: { following: new mongoose.Types.ObjectId(userId) } },
                        { $count: "count" }
                    ],
                    isFollowing: [
                        { $match: { follower: new mongoose.Types.ObjectId(currentUserId), following: new mongoose.Types.ObjectId(userId) } },
                        { $project: { _id: 1 } }
                    ]
                }
            }
        ]);

        const followingCount = followData[0].followingCount[0]?.count || 0;
        const followerCount = followData[0].followerCount[0]?.count || 0;
        const isFollowing = followData[0].isFollowing.length > 0;

        const data = {
            ...user,
            isFollowing,
            followerCount,
            followingCount,
        };

        return res.status(200).json({ status: true, message: 'User profile retrieved successfully ✅', data });
    } catch (error) {
        console.error('Error in getProfileByUserId:', error);
        return res.status(500).json({ status: false, message: 'Server Error' });
    }
};

exports.getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user.id;

        const followedUsers = await Follow.find({ followerId: userId }).select('followingId');
        const followedUserIds = followedUsers.map(follow => follow.followingId);

        const suggestions = await Follow.find({
            followerId: { $in: followedUserIds },
            followingId: { $ne: userId }
        }).populate('followingId', 'userName')
            .distinct('followingId');
        const suggestedUsers = suggestions.map(suggestion => suggestion.followingId);
        const data = suggestedUsers;
        return res.status(200).json({
            status: true,
            message: 'Suggested users retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error in getSuggestedUsers:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            data: {}
        });
    }
};

exports.searchUsers = async (req, res) => {
    try {
        const query = req.query.userName;
        if (!query) {
            return res.status(400).json({
                status: false,
                message: 'Query is required',
                data: {}
            });
        }

        const users = await User.find({
            $or: [
                { userName: new RegExp('^' + query, 'i') },
                { name: new RegExp('^' + query, 'i') }
            ]
        }).select('userName name');

        const data = users;
        return res.status(200).json({
            status: true,
            message: 'Users retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error in searchUsers:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            data: {}
        });
    }
};