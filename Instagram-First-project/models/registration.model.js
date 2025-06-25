const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, trim: true, maxlength: 250 },
    isEmailVerified: { type: Boolean, default: false },
    isBlock: { type: Boolean, default: true },
    isFollowing: { type: Boolean, default: true } 
});

module.exports = mongoose.model('User', userSchema);