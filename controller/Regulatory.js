const Regulatory = require("../models/Regulatory");

// Create a new regulatory entry
exports.createRegulatory = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? req.file.path : null;

        const regulatory = new Regulatory({ title, image });
        await regulatory.save();

        res.status(201).json({ message: "Regulatory entry created successfully", data: regulatory, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted regulatory entries
exports.getAllRegulatory = async (req, res) => {
    try {
        const regulatoryList = await Regulatory.find({ isDeleted: false });
        res.status(200).json({ data: regulatoryList, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single regulatory entry by ID
exports.getRegulatoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const regulatory = await Regulatory.findOne({ _id: id, isDeleted: false });

        if (!regulatory) {
            return res.status(404).json({ message: "Regulatory entry not found" });
        }

        res.status(200).json({ data: regulatory, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a regulatory entry by ID
exports.updateRegulatory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedData = { title };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const regulatory = await Regulatory.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!regulatory) {
            return res.status(404).json({ message: "Regulatory entry not found", error: 1 });
        }

        res.status(200).json({ message: "Regulatory entry updated successfully", data: regulatory, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Soft delete a regulatory entry by ID
exports.deleteRegulatory = async (req, res) => {
    try {
        const { id } = req.params;

        const regulatory = await Regulatory.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!regulatory) {
            return res.status(404).json({ message: "Regulatory entry not found or already deleted", error: 1 });
        }

        res.status(200).json({ message: "Regulatory entry soft-deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
