const Blogs = require("../models/Blogs");

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) data.image = req.file.path;

        const blog = new Blogs(data);
        await blog.save();

        res.status(201).json({ message: "Blog created successfully", data: blog, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all blogs (optional isDeleted check if you're implementing soft delete)
exports.getAllBlogs = async (req, res) => {
    try {
        const list = await Blogs.find(); // Add `{ isDeleted: false }` if needed
        res.status(200).json({ data: list, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found", error: 1 });
        }

        res.status(200).json({ data: blog, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

exports.getBlogByurl = async (req, res) => {
    try {
        const { url } = req.params;
        const blog = await Blogs.findOne({ url });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found", error: 1 });
        }

        res.status(200).json({ data: blog, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (req.file) updatedData.image = req.file.path;

        const blog = await Blogs.findByIdAndUpdate(id, updatedData, { new: true });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found", error: 1 });
        }

        res.status(200).json({ message: "Blog updated successfully", data: blog, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Permanently delete a blog by ID
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found", error: 1 });
        }

        res.status(200).json({ message: "Blog permanently deleted", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
