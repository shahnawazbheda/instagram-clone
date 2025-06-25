const Block = require('../models/blockModel');
const Follower = require('../models/followModel');
const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');

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

exports.blockUser = async (req, res, next) => {
    try {
        const requiredFields = ['userId'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { userId } = req.body;
        const loggedInUserId = req.user.id;

        if (userId === loggedInUserId) {
            return res.status(400).json({ status: false, message: 'You cannot block yourself', data: {} });
        }

        let block = await Block.findOne({ userid: loggedInUserId, BlockUser: userId }).lean();
        if (block) {
            return res.status(400).json({ status: false, message: 'User already blocked', data: {} });
        }

        block = new Block({ userid: loggedInUserId, BlockUser: userId });
        await block.save();
        await Follower.deleteOne({ follower: loggedInUserId, following: userId }).lean();
        await Follower.deleteOne({ follower: userId, following: loggedInUserId }).lean();

        const deleteLikes = await Like.deleteMany({ likedBy: userId }).lean();
        const deleteComment = await Comment.deleteMany({ commentBy: userId }).lean();

        const data = { block, deleteLikes, deleteComment };
        return res.status(201).json({ status: true, message: 'User Blocked!', data });
    } catch (error) {
        console.error('Error in blockUser:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    }
};

exports.unBlockUser = async (req, res, next) => {
    try {
        const requiredFields = ['userId'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { userId } = req.body;
        const loggedInUserId = req.user.id;

        const block = await Block.findOne({ userid: loggedInUserId, BlockUser: userId }).lean();
        if (!block) {
            return res.status(400).json({ status: false, message: 'User not blocked', data: {} });
        }

        await Block.deleteOne({ userid: loggedInUserId, BlockUser: userId }).lean();
        const data = block;

        return res.status(200).json({ status: true, message: 'User Unblocked!', data });
    } catch (error) {
        console.error('Error in unBlockUser:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    }
};
