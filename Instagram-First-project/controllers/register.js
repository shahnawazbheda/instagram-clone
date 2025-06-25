

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/registration.model');
const { requiredField, validateEmail, validateMobile, validateUserName, validatePassword } = require('../validations/validation');

require('dotenv').config();

function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * digits.length)];
    }
    return OTP;
}

const requiredFields = ['name', 'email', 'mobile', 'userName', 'password']; 

router.post('/', async (req, res, next) => {
    try {
        const { name, email, mobile, userName, password, bio } = req.body;

        let errors = {};
        let hasError = false;
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!requiredField(req.body[field])) {
                hasError = true;
                errors[field] = `${field} is required`;
            }
        }

        if (hasError) {
            return res.status(400).json({
                status: false,
                message: 'Required fields are missing or invalid',
                errors: errors,
                data: {}
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ status: false, message: 'Invalid email address', data: {} });
        }

        if (!validateMobile(mobile)) {
            return res.status(400).json({ status: false, message: 'Invalid phone number', data: {} });
        }

        if (!validateUserName(userName)) {
            return res.status(400).json({ status: false, message: 'Username can only contain letters, numbers, and underscores', data: {} });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ status: false, message: 'Password must be at least 8 characters long and include at least one uppercase letter, one special character, and one digit', data: {} });
        }

        if (bio && bio.split(' ').length > 150) {
            return res.status(400).json({ status: false, message: 'Bio must not exceed 150 words', data: {} });
        }

        const otp = generateOTP();
        const newUser = new User({
            name,
            email,
            mobile,
            userName,
            password,
            bio,
            otp,
            isOtpVerified: false
        });

        await newUser.save();

        // Email sending logic commented out for now
        // const transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: process.env.MAILTRAP_USER,
        //         pass: process.env.MAILTRAP_PASS
        //     }
        // });

        // const mailOptions = {
        //     from: '"Your App" <no-reply@yourapp.com>',
        //     to: email,
        //     subject: 'Your OTP Code',
        //     text: `Your OTP code is ${otp}`
        // };

        // await transport.sendMail(mailOptions);

        return res.status(201).json({
            status: true,
            message: 'User created successfully. Check your email for OTP verification ✅',
            data: { userId: newUser._id }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ status: false, message: 'Email, username, or mobile number already exists', data: {} });
        } else {
            console.error(error);
            return res.status(500).json({ status: false, message: 'Failed to create user', data: {} });
        }
    }
});

module.exports = router;
