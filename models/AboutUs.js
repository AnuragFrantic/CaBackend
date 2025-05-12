const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    position: {
        type: Number
    },
    image: {
        type: String
    },
    short_description: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("AboutUs", AboutUsSchema);
