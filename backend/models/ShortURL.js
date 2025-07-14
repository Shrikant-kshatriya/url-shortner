const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_code: {
        type: String,
        unique: true,
        required: true
    },
    click_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const ShortUrl = mongoose.model('ShortUrl', urlSchema);

module.exports = ShortUrl; 