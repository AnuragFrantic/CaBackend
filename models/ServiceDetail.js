const mongoose = require("mongoose");
const slugify = require("slugify");

const ServiceDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_description: { type: String },
    description: { type: String },
    image: { type: String },
    url: { type: String, unique: true },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Pre-save middleware to generate unique slugified URL
ServiceDetailSchema.pre("save", async function (next) {
    if (!this.isModified("title")) return next();

    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    const ServiceDetail = mongoose.model("ServiceDetail", ServiceDetailSchema);

    // Check for uniqueness and append counter if necessary
    while (await ServiceDetail.exists({ url: slug })) {
        slug = `${baseSlug}-${counter++}`;
    }

    this.url = slug;
    next();
});

module.exports = mongoose.model("ServiceDetail", ServiceDetailSchema);
