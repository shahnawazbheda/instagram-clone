const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const { authenticateToken } = require('../middleware/middleware');

router.post('/follow/:userId?', authenticateToken, followController.followUser);
router.post('/unfollow', authenticateToken, followController.unfollowUser);
router.get('/followers/:userId?', authenticateToken, followController.getFollowers);
router.get('/following', authenticateToken, followController.getFollowing);

module.exports = router;

