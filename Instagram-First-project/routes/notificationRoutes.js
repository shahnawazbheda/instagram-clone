const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/middleware');
const notificationController = require('../controllers/notificationController');

router.get('/notifications', authenticateToken, notificationController.getNotifications);

module.exports = router;