const mongoose = require("mongoose")

const BannerSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Banner', BannerSchema);