const Testimonial = require("../models/Testimonial");

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
    try {
        const { name, post, short_description } = req.body;
        const image = req.file ? req.file.path : null;

        const testimonial = new Testimonial({ name, post, short_description, image });
        await testimonial.save();

        res.status(201).json({ message: "Testimonial created successfully", data: testimonial, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted testimonials
exports.getAllTestimonials = async (req, res) => {
    try {
        const list = await Testimonial.find({ isDeleted: false });
        res.status(200).json({ data: list, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a testimonial by ID
exports.getTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findOne({ _id: id, isDeleted: false });

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found", error: 1 });
        }

        res.status(200).json({ data: testimonial, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update testimonial by ID
exports.updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, post, short_description } = req.body;

        const updatedData = { name, post, short_description };
        if (req.file) updatedData.image = req.file.path;

        const testimonial = await Testimonial.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found", error: 1 });
        }

        res.status(200).json({ message: "Testimonial updated successfully", data: testimonial, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};



// Permanently delete testimonial
exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await Testimonial.findByIdAndDelete(id);

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found", error: 1 });
        }

        res.status(200).json({ message: "Testimonial permanently deleted", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
