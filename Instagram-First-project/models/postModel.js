
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    files: [
        {
            fileName: {
                type: String,
                required: false
            },
            filePath: {
                type: String,
                required: false
            },
            fileType: {
                type: String,
                required: false
            }
        }
    ],
    likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    likesCount: { type: Number, default: 0 } 
});

module.exports = mongoose.model('Post', postSchema);
