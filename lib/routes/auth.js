const express = require('express');
const { sendOTP, verifyOTP, resendOTP } = require('../controllers/authController');

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;