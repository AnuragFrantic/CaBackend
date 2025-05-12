const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    short_description: {
        type: String
    },
    url: { type: String, unique: true },

}, { timestamps: true })



BlogsSchema.pre("save", async function (next) {
    if (this.isModified("title")) {
        let baseSlug = slugify(this.title, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        // Ensure the slug is unique
        while (await mongoose.models.Blogs.findOne({ url: slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        this.url = slug;
    }
    next();
});

module.exports = mongoose.model("Blogs", BlogsSchema)