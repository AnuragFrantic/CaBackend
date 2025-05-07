const mongoose = require("mongoose");

const RegDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_description: { type: String },
    description: { type: String },
    image: { type: String },
    reg_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Regulatory",
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model("RegulatoryDetail", RegDetailSchema);
