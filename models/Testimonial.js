const mongoose = require("mongoose");

const Testimonial = new mongoose.Schema({
    name: { type: String },
    post: { type: String },
    image: { type: String },
    short_description: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', Testimonial);
