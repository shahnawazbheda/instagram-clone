

const User = require('../models/registration.model');
const Helper = require('../helper/helper');

exports.verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const requiredFields = ['email', 'otp'];
        let errors = {};
        let hasError = false;

        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!Helper.requiredField(req.body[field])) {
                hasError = true;
                errors[field] = `${field} is required`;
            }
        }

        if (hasError) {
            return res.status(400).json({
                status: false,
                message: 'Required fields are missing',
                errors: errors,
                data: {}
            });
        }

        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found', data: {} });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ status: false, message: 'Invalid OTP', data: {} });
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set: { isEmailVerified: true, otp: null }
        }, { new: true }).lean();

        const token = Helper.generateToken(updatedUser);

        return res.status(200).json({
            status: true,
            message: 'OTP verified successfully ✅',
            token,
            data: {}
        });
    } catch (error) {
        console.error('Error in verifyEmail:', error.message);
        return res.status(500).json({ status: false, message: 'Server error', data: {} });
        next(error);
    }
};
