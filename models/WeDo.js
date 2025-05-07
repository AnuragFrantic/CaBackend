const mongoose = require("mongoose");

const WeDo = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    short_description: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('WeDo', WeDo);
