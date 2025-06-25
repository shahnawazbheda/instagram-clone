const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        required: true 
    },
    likedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    likedByUserName: {
        type: String,
        required: true
    },
    postOwnerUserName: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
