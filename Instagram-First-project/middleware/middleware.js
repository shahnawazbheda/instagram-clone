const jwt = require('jsonwebtoken');
const Helper = require('../helper/helper');
const path = require('path');


const destinationBase = path.join(__dirname, '../public');

const setUploadPath = (req, res, next) => {

    const folderName = req.params.folderName || 'Post';
    req.uploadPath = path.join(destinationBase, folderName);
    next();
};




const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
     if (!token) return res.status(401).json({ status: false, message: 'Access denied, no token provided', data: {} });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: 'Invalid token', data: {} });
    }
};

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500,
            data: {}
        }
    });
};

exports.validateEmailField = (req, res, next) => {
    const { email } = req.body;
    if (!Helper.requiredField(email) || !Helper.validateEmail(email)) {
        return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
    }
    next();
};

exports.validateUserFields = (req, res, next) => {
    const { name, email, mobile, userName, password, otp } = req.body;
    if (!Helper.requiredField(name)) return res.status(400).json({ status: false, message: 'Name is required', data: {} });
    if (!Helper.requiredField(email) || !Helper.validateEmail(email)) return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
    if (!Helper.requiredField(mobile) || !Helper.validateMobile(mobile)) return res.status(400).json({ status: false, message: 'Invalid mobile number', data: {} });
    if (!Helper.requiredField(userName) || !Helper.validateUserName(userName)) return res.status(400).json({ status: false, message: 'Invalid username', data: {} });
    if (!Helper.requiredField(password)) return res.status(400).json({ status: false, message: 'Invalid password', data: {} });
    if (!Helper.requiredField(otp)) return res.status(400).json({ status: false, message: 'OTP is required', data: {} });
    next();
};

exports.validatePasswordFields = (req, res, next) => {
    const { password, newpassword } = req.body;
    if (!password) return res.status(400).json({ status: false, message: 'Current password is required', data: {} });
    if (!newpassword) return res.status(400).json({ status: false, message: 'New password is required', data: {} });
    if (password === newpassword) return res.status(400).json({ status: false, message: 'Enter a new password', data: {} });
    next();
};

module.exports = { authenticateToken, errorMiddleware, setUploadPath };
