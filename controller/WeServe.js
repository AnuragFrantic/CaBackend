const WeServe = require("../models/WeServe");

// Create a new WeServe entry
exports.createWeServe = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? req.file.path : null;



        const weserve = new WeServe({ title, image });
        await weserve.save();

        res.status(201).json({ message: "WeServe entry created successfully", data: weserve, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted WeServe entries
exports.getAllWeServe = async (req, res) => {
    try {
        const weServeList = await WeServe.find({ isDeleted: false });
        res.status(200).json({ data: weServeList, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single WeServe entry by ID
exports.getWeServeById = async (req, res) => {
    try {
        const { id } = req.params;
        const weserve = await WeServe.findOne({ _id: id, isDeleted: false });

        if (!weserve) {
            return res.status(404).json({ message: "WeServe entry not found" });
        }

        res.status(200).json({ data: weserve, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a WeServe entry by ID
exports.updateWeServe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedData = { title };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const weserve = await WeServe.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!weserve) {
            return res.status(404).json({ message: "WeServe entry not found", error: 1 });
        }

        res.status(200).json({ message: "WeServe entry updated successfully", data: weserve, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Soft delete a WeServe entry by ID
exports.deleteWeServe = async (req, res) => {
    try {
        const { id } = req.params;

        const weserve = await WeServe.findByIdAndDelete(id);

        if (!weserve) {
            return res.status(404).json({ message: "WeServe entry not found", error: 1 });
        }

        res.status(200).json({ message: "WeServe entry permanently deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

