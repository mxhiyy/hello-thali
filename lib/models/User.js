const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, 'Enter you Phone Number']
    },

    otp:  {
        type: String,
        required: true,
    },

    otpExpires: {
        type: Date,
        required: true,
    },

    messageId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
