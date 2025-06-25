
const Follow = require('../models/followModel');
const User = require('../models/registration.model');
const Block = require('../models/blockModel');
const Notification = require('../models/Notification');

const validateRequiredFields = (fields, data) => {
    let errors = {};
    let hasError = false;

    fields.forEach(field => {
        if (!data[field]) {
            hasError = true;
            errors[field] = `${field} is required`;
        }
    });

    return { hasError, errors };
};

exports.followUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const followerId = req.user.id;

        if (followerId === userId) {
            return res.status(400).json({ status: false, message: 'You cannot follow yourself' });
        }

        const existingFollow = await Follow.findOne({ follower: followerId, following: userId }).lean();
        if (existingFollow) {
            return res.status(400).json({ status: false, message: 'You are already following this user' });
        }

        const follow = new Follow({ follower: followerId, following: userId });
        await follow.save();

        const notification = new Notification({
            userId,
            actorId: followerId,
            type: 'follow',
            message: `${req.user.userName} started following you.`
        });
        await notification.save();
        const data = follow;

        return res.status(201).json({ status: true, message: 'Followed successfully', data});
    } catch (error) {
        console.error('Error following user:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const followerId = req.user.id;

        const follow = await Follow.findOneAndDelete({ follower: followerId, following: userId }).lean();
        if (!follow) {
            return res.status(400).json({ status: false, message: 'You are not following this user' });
        }

        return res.status(200).json({ status: true, message: 'Unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const requiredFields = ['userId'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { userId } = req.body;

        const followers = await Follow.find({ following: userId }).populate('follower', 'name userName').lean();
        const data = { followers };
        return res.status(200).json({ status: true, message: 'Get followers successfully', data });
    } catch (error) {
        console.error('Error retrieving followers:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const userId = req.user.id;

        const following = await Follow.find({ follower: userId }).populate('following', 'name userName').lean();
        const data = { following };
        return res.status(200).json({ status: true, message: 'Get following successfully', data });
    } catch (error) {
        console.error('Error retrieving following:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
    }
};
