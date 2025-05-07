const WeDo = require("../models/WeDo");

// Create a new WeDo entry
exports.createWeDo = async (req, res) => {
    try {
        const { title, short_description } = req.body;
        const image = req.file ? req.file.path : null;

        const wedo = new WeDo({ title, short_description, image });
        await wedo.save();

        res.status(201).json({ message: "WeDo entry created successfully", data: wedo, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted WeDo entries
exports.getAllWeDo = async (req, res) => {
    try {
        const weDoList = await WeDo.find({ isDeleted: false });
        res.status(200).json({ data: weDoList, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single WeDo entry by ID
exports.getWeDoById = async (req, res) => {
    try {
        const { id } = req.params;
        const wedo = await WeDo.findOne({ _id: id, isDeleted: false });

        if (!wedo) {
            return res.status(404).json({ message: "WeDo entry not found", error: 1 });
        }

        res.status(200).json({ data: wedo, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a WeDo entry by ID
exports.updateWeDo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, short_description } = req.body;

        const updatedData = { title, short_description };
        if (req.file) {
            updatedData.image = req.file.path;
        }

        const wedo = await WeDo.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!wedo) {
            return res.status(404).json({ message: "WeDo entry not found", error: 1 });
        }

        res.status(200).json({ message: "WeDo entry updated successfully", data: wedo, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};



// Permanently delete a WeDo entry
exports.deleteWeDoPermanent = async (req, res) => {
    try {
        const { id } = req.params;

        const wedo = await WeDo.findByIdAndDelete(id);

        if (!wedo) {
            return res.status(404).json({ message: "WeDo entry not found", error: 1 });
        }

        res.status(200).json({ message: "WeDo entry permanently deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
