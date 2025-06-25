const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isFollowing: { type: Boolean, default: true }
}, { timestamps: true });

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;