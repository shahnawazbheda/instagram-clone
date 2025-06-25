const Post = require('../models/postModel');
const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');
const mongoose = require('mongoose');
const Helper = require('../helper/helper');
const User = require('../models/registration.model')

const checkField = (field, value) => {
    return !value || value.trim().length === 0;
};

const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const errors = {};
        let hasError = false;

        for (const field of requiredFields) {
            if (field === 'image' || field === 'video') {
                if (!req.file || !(field === 'image' ? isImageFile(req.file) : isVideoFile(req.file))) {
                    hasError = true;
                    errors[field] = `${field} is required and must be a valid ${field === 'image' ? 'image' : 'video'} file`;
                }
            } else {
                if (checkField(field, req.body[field])) {
                    hasError = true;
                    errors[field] = `${field} is required`;
                }
            }
        }

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', errors });
        }
        next();
    };
};

const isImageFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
};

const isVideoFile = (file) => {
    const allowedExtensions = ['mp4', 'avi', 'mov', 'mkv'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
};

const validateUserId = (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(404).json({ status: false, message: 'User not found', data: {} });
    }
    next();
};

exports.uploadSinglePost = [
    validateUserId,
    validateFields(['caption', 'image']),
    async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { caption } = req.body;
            const newPost = new Post({ userId, caption });

            if (req.file) {
                newPost.files = [{
                    fileName: req.file.originalname,
                    filePath: req.file.path,
                    fileType: req.file.mimetype
                }];
            }
            const data = await newPost.save();
            return res.status(201).json({ status: true, message: 'Uploaded successfully', data });
        } catch (error) {
            console.error('Error in uploadSinglePost:', error);
            return res.status(500).json({ status: false, message: 'Server error', data: {} });
        }
    }
];

exports.UploadPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { caption } = req.body;
        const newPost = new Post({ userId, caption });

        if (req.files && req.files.length > 0) {
            newPost.files = req.files.map(file => ({
                fileName: file.originalname,
                filePath: `http://localhost:${process.env.PORT || 3001}/post/${file.filename}`,
                fileType: isVideoFile(file) ? 'video' : (isImageFile(file) ? 'image' : 'unknown')
            }));
        }
        const data = await newPost.save();

        return res.status(201).json({ status: true, message: 'Uploaded successfully', data });
    } catch (error) {
        console.error('Error in UploadPost:', error);
        return res.status(5100).json({ status: false, message: 'Server error', data: {} });
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await Post.deleteMany({ userId });
        return res.status(200).json({ status: true, message: 'All posts deleted successfully', data: {} });
    } catch (error) {
        console.error('Error in deletePost:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
    }
};


exports.deletePerticularPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({ status: false, message: 'postId is reuired', data: {} });
        }

        const deletedPost = await Post.findOneAndDelete({ _id: postId, userId });

        if (!deletedPost) {
            return res.status(404).json({ status: false, message: 'Post not found or not authorized', data: {} });
        }

        const data = deletedPost;
        return res.status(200).json({ status: true, message: 'Post deleted successfully', data });
    } catch (error) {
        console.error('Error in deletePerticularPost:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
    }
};

exports.getOwnAllPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
                data: {}
            });
        }

        const posts = await Post.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $project: {
                    files: 1,
                    caption: 1,
                    likeCount: { $size: "$likes" },
                    commentCount: { $size: "$comments" }
                }
            }
        ]);

        const formattedPosts = posts.map(post => ({
            files: post.files.map(file => ({
                postId: post._id,
                fileName: file.fileName,
                filePath: file.filePath,
                userId: userId,
                username: user.userName,
            })),
            caption: post.caption,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
        }));

        return res.status(200).json({
            status: true,
            message: 'Retrieved all posts successfully',
            data: formattedPosts
        });
    } catch (error) {
        console.error('Error in getOwnAllPosts:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            data: {}
        });
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const posts = await Post.aggregate([
            {
                $match: {
                    "userId": { $ne: new mongoose.Types.ObjectId(userId) }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'UserDetails'
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    likesCount: { $size: "$likes" },
                    commentsCount: { $size: "$comments" },
                    isLiked: {
                        $cond: {
                            if: { $in: [new mongoose.Types.ObjectId(userId), "$likes.likedBy"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ status: false, message: 'No Post', data: [] });
        }
        const data =posts;
        return res.status(200).json({ status: true, message: 'Retrieved all the posts successfully ✅', data });
    } catch (error) {
        console.error('Error in getAllPosts:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
    }
};


exports.getPostById = async (req, res, next) => {
    try {
        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({ status: false, message: 'postId Is Required !', data: {} });
        }

        const post = await Post.findById(postId).lean();
        if (!post) {
            return res.status(404).json({ status: false, message: 'Post not found', data: {} });
        }

        const likeCount = await Like.countDocuments({ postId });
        const commentCount = await Comment.countDocuments({ postId });

        const data = { post, likeCount, commentCount };
        return res.status(200).json({ status: true, message: 'Post retrieved successfully ✅', data });
    } catch (error) {
        console.error('Error in getPostById:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
    }
};

exports.getPostsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ userId })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const postsWithCounts = await Promise.all(
            posts.map(async (post) => {
                const likeCount = await Like.countDocuments({ postId: post._id });
                const commentCount = await Comment.countDocuments({ postId: post._id });
                return { ...post, likeCount, commentCount };
            })
        );

        return res.status(200).json({
            status: true,
            message: 'Posts retrieved successfully ✅',
            data: postsWithCounts,
        });
    } catch (error) {
        console.error('Error in getPostsByUserId:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            data: {},
        });
    }
};