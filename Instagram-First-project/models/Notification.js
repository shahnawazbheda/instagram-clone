// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const NotificationSchema = new Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     type: {
//         type: String,
//         required: true,
//         enum: ['like', 'comment', 'follow'], 
//     },
//     relatedUserId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     relatedPostId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Post'
//     },
//     message: {
//         type: String,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Notification', NotificationSchema);

const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     type: { type: String, enum: ['like', 'comment', 'follow', 'unfollow'], required: true },
//     files: [
//         {
//             fileName: {
//                 type: String,
//                 ref: 'Post',
//                 required: false
//             },
//             filePath: {
//                 type: String,
//                 ref: 'Post',
//                 required: false
//             },
//             fileType: {
//                 type: String,
//                 ref: 'Post',
//                 required: false
//             }

//         }
    
//     ],
//     postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
//     commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
//     message: { type: String, required: true },
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
// });

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'comment', 'follow', 'unfollow'], required: true },
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
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);