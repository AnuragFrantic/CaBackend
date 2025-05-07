const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    name: {
        type: String
    },
    short_description: {
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String,
        unique: true
    },
    image: {
        type: String
    },
    type: {
        type: String,
        enum: ["Social", "Page", "Footer"]
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })


module.exports = mongoose.model('Policy', PolicySchema);
