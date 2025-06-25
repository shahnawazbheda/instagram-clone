const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/middleware');

router.post('/register', authController.register);
router.post('/verify-email-otp', authController.verifyEmailOTP);
router.post('/login', authController.login);
router.post('/loginbyUsername', authController.loginbyUsername);
router.post('/change-password', authenticateToken, authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-reset-otp', authController.verifyResetOTP);


module.exports = router;
