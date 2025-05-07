const mongoose = require("mongoose");
const slugify = require("slugify");

const ServiceSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    image: { type: String },
    url: { type: String, unique: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Middleware to generate URL from title before saving
ServiceSchema.pre("save", async function (next) {
    if (this.isModified("title")) {
        let baseSlug = slugify(this.title, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        // Ensure the slug is unique
        while (await mongoose.models.Service.findOne({ url: slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        this.url = slug;
    }
    next();
});

module.exports = mongoose.model('Service', ServiceSchema);
