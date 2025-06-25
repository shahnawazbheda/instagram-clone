const User = require('../models/registration.model');
const Otp = require('../models/otpVerifyModel');
const Helper = require('../helper/helper');
const bcrypt = require('bcryptjs');
const Post = require('../models/postModel');
const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');


const validateRequiredFields = (fields, data) => {
    let errors = {};
    let hasError = false;

    fields.forEach(field => {
        if (!data[field]) {
            hasError = true;
            errors[field] = `${field} is required`;
        }
    });

    return { hasError, errors };
};

exports.register = async (req, res, next) => {
    try {
        const requiredFields = ['email'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { email } = req.body;
        if (!Helper.validateEmail(email)) {
            return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
        }
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User already exists', data: {} });
        }

        const otp = Helper.generateOTP();
        let existingOtp = await Otp.findOne({ email });

        if (existingOtp) {
            await Otp.updateOne({ email }, { otp });
        } else {
            await Otp.create({ email, otp });
        }

        return res.status(200).json({ status: true, message: 'OTP sent to email ✅', data: {} });
    } catch (error) {
        console.error('Error in register:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
        next(error);
    }
};
exports.verifyEmailOTP = async (req, res, next) => {
    try {
        const requiredFields = ['name', 'email', 'mobile', 'userName', 'password', 'otp'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { name, email, mobile, userName, password, bio, otp } = req.body;

        if (!Helper.validateEmail(email)) return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
        if (!Helper.validateMobile(mobile)) return res.status(400).json({ status: false, message: 'Invalid mobile number', data: {} });

        const otpRecord = await Otp.findOne({ email }).lean();
        if (!otpRecord) return res.status(404).json({ status: false, message: 'OTP not found', data: {} });
        if (otpRecord.otp !== otp) return res.status(400).json({ status: false, message: 'Invalid OTP', data: {} });

        const existingUser = await User.findOne({ $or: [{ email }, { mobile }, { userName }] }).lean();
        if (existingUser) {
            let errorMessage = '';
            if (existingUser.email === email) errorMessage += 'Email already exists. ';
            if (existingUser.mobile === mobile) errorMessage += 'Mobile number already exists. ';
            if (existingUser.userName === userName) errorMessage += 'Username already exists. ';
            return res.status(400).json({ status: false, message: errorMessage, data: {} });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, mobile, userName, password: hashedPassword, bio, isEmailVerified: true });
        await newUser.save();
        await Otp.deleteOne({ email });

        const token = Helper.generateToken(newUser);
        const data = newUser;

        return res.status(200).json({ status: true, message: 'OTP verified and user registered successfully ✅', token, data });
    } catch (error) {
        console.error('Error in verifyEmailOTP:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const requiredFields = ['email', 'password'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { email, password } = req.body;
        if (!Helper.validateEmail(email)) {
            return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
        }

        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found', data: {} });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: 'Invalid password', data: {} });
        }
        const data = user;
        const token = Helper.generateToken(user);

        const posts = await Post.find({ userId: user._id }).lean();
        const postsWithCounts = await Promise.all(posts.map(async post => {
            const likeCount = await Like.countDocuments({ postId: post._id });
            const commentCount = await Comment.countDocuments({ postId: post._id });
            return {
                ...post,
                likeCount,
                commentCount
            };
        }));
        const postsCount = postsWithCounts;
        return res.status(200).json({ status: true, message: 'Login successful ✅', data, token, postsCount });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
        next(error);
    }
};

exports.loginbyUsername = async (req, res, next) => {
    try {
        const requiredFields = ['input', 'password'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { input, password } = req.body;
        const user = await User.findOne({ $or: [{ email: input }, { mobile: input }, { userName: input }] }).lean();
        if (!user) return res.status(404).json({ status: false, message: 'User not found', data: {} });
        if (!user.isEmailVerified) return res.status(403).json({ status: false, message: 'Email not verified', data: {} });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ status: false, message: 'Invalid password', data: {} });

        const token = Helper.generateToken(user);
        const data = user;
        return res.status(200).json({ status: true, message: 'Login successful ✅', token, data });
    } catch (error) {
        console.error('Error in loginbyUsername:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const requiredFields = ['password', 'newpassword'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const userId = req.user.id;
        const { password, newpassword } = req.body;

        if (password === newpassword) {
            return res.status(400).json({ status: false, message: 'Enter Password must be unique !', data: {} });
        }

        const user = await User.findById(userId).lean();
        if (!user) return res.status(404).json({ status: false, message: 'User not found', data: {} });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ status: false, message: 'Invalid current password', data: {} });

        const hashedNewPassword = await bcrypt.hash(newpassword, 10);
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { password: hashedNewPassword } }, { new: true }).lean();

        const data = updatedUser;
        return res.status(200).json({ status: true, message: 'Password changed successfully ✅', data });
    } catch (error) {
        console.error('Error in changePassword:', error);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const requiredFields = ['email'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { email } = req.body;
        if (!Helper.validateEmail(email)) {
            return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
        }

        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found', data: {} });
        }

        const otp = Helper.generateOTP();
        let existingOtp = await Otp.findOne({ email });
        if (existingOtp) {
            existingOtp.otp = otp;
            await existingOtp.save();
        } else {
            await Otp.create({ email, otp });
        }
        return res.status(200).json({ status: true, message: 'OTP sent to email ✅', data: {} });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
        next(error);
    }
};exports.verifyResetOTP = async (req, res, next) => {
    try {
        const requiredFields = ['email', 'otp', 'newPassword'];
        const { hasError, errors } = validateRequiredFields(requiredFields, req.body);

        if (hasError) {
            return res.status(400).json({ status: false, message: 'Validation error', data: errors });
        }

        const { email, otp, newPassword } = req.body;
        if (!Helper.validateEmail(email)) {
            return res.status(400).json({ status: false, message: 'Invalid email', data: {} });
        }

        const otpRecord = await Otp.findOne({ email }).lean();
        if (!otpRecord) {
            return res.status(404).json({ status: false, message: 'OTP not found', data: {} });
        }
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ status: false, message: 'Invalid OTP', data: {} });
        }

        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found', data: {} });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(user._id, { $set: { password: hashedNewPassword } }).lean();
        await Otp.deleteOne({ email });
        return res.status(200).json({ status: true, message: 'Password reset successfully ✅', data: {} });
    } catch (error) {
        console.error('Error in verifyResetOTP:', error);
        return res.status(500).json({ status: false, message: 'An internal server error occurred', data: {} });
        next(error);
    }
};