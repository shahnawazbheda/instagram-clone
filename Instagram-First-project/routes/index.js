const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
const likeRoutes = require('./likeRoute');  
const commentRouts = require('./commentRouts');
const followRoutes = require('./followRoutes');
const blockRotuts = require('./blockRoutes')
const notificationRoutes = require('./notificationRoutes')


router.get('/', (req, res) => {
    return res.status(201).json({ status: true, message: 'Welcome to the API', data: {} });
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/like', likeRoutes);
router.use('/comment', commentRouts);
router.use('/followUnfollow', followRoutes);
router.use('/block',blockRotuts);
router.use('/UserNotification',notificationRoutes);



module.exports = router;
