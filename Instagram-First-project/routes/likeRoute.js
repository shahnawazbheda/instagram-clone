
const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const { authenticateToken } = require('../middleware/middleware');

router.post('/like-post', authenticateToken, LikeController.likePost);
router.post('/unlike-post', authenticateToken, LikeController.unlikePost);

module.exports = router;