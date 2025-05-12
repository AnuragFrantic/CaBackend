const mongoose = require("mongoose");
const slugify = require("slugify");

const RegDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_description: { type: String },
    description: { type: String },
    image: { type: String },
    url: { type: String, unique: true },
    reg_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Regulatory",
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

RegDetailSchema.pre("save", async function (next) {
    if (!this.isModified("title")) return next();

    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    const RegulatoryDetail = mongoose.model("RegulatoryDetail", RegDetailSchema);

    // Check for uniqueness and append counter if necessary
    while (await RegulatoryDetail.exists({ url: slug })) {
        slug = `${baseSlug}-${counter++}`;
    }

    this.url = slug;
    next();
});



module.exports = mongoose.model("RegulatoryDetail", RegDetailSchema);
