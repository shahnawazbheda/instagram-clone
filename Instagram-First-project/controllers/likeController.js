const User = require('../models/registration.model');
const Post = require('../models/postModel');
const Like = require('../models/likeModel');
const Block = require('../models/blockModel');
const Notification = require('../models/Notification');

const validateRequiredFields = (fields, data) => {
  let errors = {};
  let hasError = false;

  fields.forEach((field) => {
    if (!data[field]) {
      hasError = true;
      errors[field] = `${field} is required`;
    }
  });

  return { hasError, errors };
};


// exports.likePost = async (req, res, next) => {
//   try {
//     const { postId } = req.body;
//     const userId = req.user.id;

//     const user = await User.findById(userId).lean();
//     if (!user) {
//       return res.status(404).json({ status: false, message: 'User not found', data: {} });
//     }

//     const post = await Post.findById(postId).lean();
//     if (!post) {
//       return res.status(404).json({ status: false, message: 'Post not found', data: {} });
//     }

//     const existingLike = await Like.findOne({ postId, likedBy: userId });
//     if (existingLike) {
//       return res.status(400).json({ status: false, message: 'Already liked this post', data: {} });
//     }

//     const like = new Like({
//       postId,
//       likedBy: userId,
//       likedByUserName: user.userName,
//       postOwnerUserName: post.userId
//     });

//     await like.save();

//     await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } });
//     // await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

//     const data = like;
//     return res.status(200).json({ status: true, message: 'Post liked successfully', data });
//   } catch (error) {
//     console.error('Error in likePost:', error);
//     return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
//     next(error);
//   }
// };


exports.likePost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found', data: {} });
    }

    const post = await Post.findById(postId).lean();
    if (!post) {
      return res.status(404).json({ status: false, message: 'Post not found', data: {} });
    }

    const existingLike = await Like.findOne({ postId, likedBy: userId });
    if (existingLike) {
      return res.status(400).json({ status: false, message: 'Already liked this post', data: {} });
    }

    const like = new Like({
      postId,
      likedBy: userId,
      likedByUserName: user.userName,
      postOwnerUserName: post.userId
    });

    await like.save();

    await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } });

    const notification = new Notification({
      userId: post.userId, 
      actorId: userId,
      type: 'like',
      postId: postId,
      message: `${user.userName} liked your post.`
    });
    await notification.save();

    const data = like;

    return res.status(200).json({ status: true, message: 'Post liked successfully', data });
  } catch (error) {
    console.error('Error in likePost:', error);
    return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    next(error);
  }
};


exports.unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId).lean();
    if (!post) {
      return res.status(404).json({ status: false, message: 'Post not found', data: {} });
    }

    const like = await Like.findOneAndDelete({ postId, likedBy: userId });
    if (!like) {
      return res.status(404).json({ status: false, message: 'You Can`t Like In This Post', data: {} });
    }

    await Post.findByIdAndUpdate(postId, { $pull: { likes: like._id } });
    const data = like;
    return res.status(200).json({ status: true, message: 'Post unliked successfully', data });
  } catch (error) {
    console.error('Error in unlikePost:', error);
    return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
    next(error);
  }
};

