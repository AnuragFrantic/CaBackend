const mongoose = require("mongoose");

const WeServe = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('WeServe', WeServe);
