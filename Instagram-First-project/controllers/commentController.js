
const User = require('../models/registration.model');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
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

exports.DeleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.query;
        const userId = req.user.id;
        const comment = await Comment.findOne({ _id: commentId, commentBy: userId }).lean();
        if (!comment) {
            return res.status(404).json({ status: false, message: 'Comment not found or you do not have permission to delete it', data: {} });
        }
        await Comment.findByIdAndDelete(commentId).lean();
        return res.status(200).json({ status: true, message: 'Comment deleted successfully', data: {} });
    } catch (error) {
        console.error('Error in deleteComment:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    }
};


exports.getComment = async (req, res, next) => {
    try {
        const postId = req.query.postId;
        const post = await Comment.find({ postId }).lean();
        
        if (!post ) {
            return res.status(404).json({ status: false, message: 'Post not found or no comments', data: {} });
        }

        return res.status(200).json({ status: true, message: 'Retrieved all the comments successfully', data: post });
    } catch (error) {
        console.error('Error in getComment:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    }
};

exports.commentPost = async (req, res) => {
    try {
        const requiredFields = ['postId', 'comment'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { postId, comment, blockUser } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found', data: {} });
        }

        const post = await Post.findById(postId).lean();
        if (!post) {
            return res.status(404).json({ status: false, message: 'Post not found', data: {} });
        }

        const isBlock = await Block.findOne({ blockUser }).lean();
        if (isBlock) {
            return res.status(401).json({ status: false, message: 'You have blocked this user! Please unblock the user first.', data: {} });
        }

        const notification = new Notification({
            userId: post.userId,
            actorId: userId,
            type: 'comment',
            postId: postId,
            commentId: comment._id,
            message: `${user.userName} commented on your post.`
        });

        await notification.save();

        const newComment = new Comment({
            postId,
            comment,
            commentBy: userId,
            commentByUserName: user.userName,
            postOwnerId: post.userId
        });

        const data = newComment;

        await newComment.save();
        return res.status(200).json({ status: true, message: 'Comment added successfully', data });
    } catch (error) {
        console.error('Error in commentPost:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    }
};

