

const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const createMulterStorage = require('../utils/multerStorage');

const Helper = {
    requiredField: function (value) {
        return value !== undefined && value !== null && value !== '';
    },

    validateEmail: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validateMobile: function (mobile) {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    },

    validateUserName: function (userName) {
        const userNameRegex = /^[a-zA-Z0-9]{3,}$/;
        return userNameRegex.test(userName);
    },

    generateOTP: function () {
        // return Math.floor(100000 + Math.random() * 900000).toString();
        return 1234;
    },

    generateToken: function (user) {
        const payload = { id: user._id, name: user.name, email: user.email, mobile: user.mobile, userName: user.userName, bio: user.bio };
        return jwt.sign(payload, process.env.JWT_SECRET);
    },

    handleFileUpload: function (uploadPath) {
        return (req, res, next) => {
            const upload = createMulterStorage(uploadPath).array('files');
            upload(req, res, (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(5100).json({ status: false, message: 'Error uploading file', data: {} });
                }
                next();
            });
        };
    },
    
    handleSingleFileUpload: function (uploadPath) {
        return (req, res, next) => {
            const upload = createMulterStorage(uploadPath).single('file');
            upload(req, res, (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(5100).json({ status: false, message: 'Error uploading single file', data: {} });
                }
                next();
            });
        };
    }
};

module.exports = Helper;