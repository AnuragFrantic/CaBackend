const Banner = require("../models/Banner"); // Adjust the path if needed

// Create a new banner
exports.createBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.path : null; // Assuming file upload is handled

        const banner = new Banner({
            title,
            description,
            image
        });

        await banner.save();
        res.status(201).json({ message: "Banner created successfully", data: banner, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ data: banners, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single banner by ID
exports.getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found", error: 1 });
        }
        res.status(200).json({ data: banner, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a banner by ID
exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedData = { title, description };

        if (req.file) {
            updatedData.image = req.file.path; // Assuming file upload is handled
        }

        const banner = await Banner.findByIdAndUpdate(id, updatedData, { new: true });
        if (!banner) {
            return res.status(404).json({ message: "Banner not found", error: 1 });
        }

        res.status(200).json({ message: "Banner updated successfully", banner, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Delete a banner by ID
exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found", error: 1 });
        }

        res.status(200).json({ message: "Banner deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
