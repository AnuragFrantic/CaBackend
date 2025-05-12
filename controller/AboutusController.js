const AboutUs = require('../models/AboutUs')


exports.createAbout = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.image = req.file.path;
        }
        const aboutus = new AboutUs(data);
        await aboutus.save();

        res.status(201).json({ message: "aboutus created successfully", aboutus, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};


exports.getAllAboutUs = async (req, res) => {
    try {
        const about = await AboutUs.find().sort({ position: 1 }); // Ascending order
        res.status(200).json({ data: about, error: 0, message: "Fetch All About Us" });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};



exports.updateAbout = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const data = req.body; // Get the fields to update from the request body

        if (req.file) {
            data.image = req.file.path; // Update the image if a file is provided
        }

        const updatedAbout = await AboutUs.findByIdAndUpdate(id, data, { new: true }); // Return updated document

        if (!updatedAbout) {
            return res.status(404).json({ message: "About Us not found", error: 1 });
        }

        res.status(200).json({ message: "About Us updated successfully", updatedAbout, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};


exports.deleteAbout = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAbout = await AboutUs.findByIdAndDelete(id);

        if (!deletedAbout) {
            return res.status(404).json({ message: "About Us not found", error: 1 });
        }

        res.status(200).json({ message: "About Us deleted successfully", deletedAbout, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
