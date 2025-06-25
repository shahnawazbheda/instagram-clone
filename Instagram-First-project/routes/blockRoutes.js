const express = require('express');
const router = express.Router();
const BlockController = require('../controllers/blockController');
const { authenticateToken } = require('../middleware/middleware');

router.post('/block-user', authenticateToken, BlockController.blockUser);
router.post('/unblock-user', authenticateToken, BlockController.unBlockUser);

module.exports = router;
