const mongoose = require("mongoose");

const Regulatory = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Regulatory', Regulatory);
