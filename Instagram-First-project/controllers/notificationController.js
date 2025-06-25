const Notification = require('../models/Notification');

// exports.getNotifications = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const notifications = await Notification.find({ userId })
//             .sort({ createdAt: -1 })
//             .populate('actorId', 'userName')
//             .populate('postId', 'title')
//             .populate('commentId', 'content')
//             .populate('files','path');

//         const data = notifications;

//         return res.status(200).json({
//             status: true,
//             message: 'Notifications retrieved successfully',
//             data
//         });
//     } catch (error) {
//         console.error('Error in getNotifications:', error);
//         return res.status(500).json({
//             status: false,
//             message: 'Server error',
//             data: {}
//         });
//     }
// };


exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .populate('actorId', 'userName')
            .populate('postId', 'title filePath')
            .populate('commentId', 'content');


            const data = notifications;
        return res.status(200).json({
            status: true,
            message: 'Notifications retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error in getNotifications:', error);
        return res.status(500).json({
            status: false,
            message: 'Server error',
            data: {}
        });
    }
};