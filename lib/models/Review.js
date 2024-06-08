const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: String, 
    review: String,
    date: {
        type: Date,
        default: Date.now,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);