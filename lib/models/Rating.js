const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    quality: Number,
    affordability: Number,
    convenience: Number, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });


module.exports = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);