const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/middleware');

router.get('/profile', authenticateToken, userController.getProfile);
router.get('/getProfileByUserId', authenticateToken, userController.getProfileByUserId);
router.put('/update', authenticateToken, userController.UpdateProfile);
router.get('/getAllUserName', userController.getAllUserName);
router.get('/suggested-users', authenticateToken, userController.getSuggestedUsers);
router.get('/search-users', authenticateToken, userController.searchUsers);

module.exports = router;
