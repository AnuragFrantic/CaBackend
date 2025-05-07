const Policy = require("../models/Policy");
const slugify = require("slugify");

// Create or update policy based on name
exports.createOrUpdatePolicy = async (req, res) => {
    try {
        const { name, short_description, description, type } = req.body;
        const image = req.file ? req.file.path : null;
        const url = slugify(name, { lower: true });   

        let existingPolicy = await Policy.findOne({ name, isDeleted: false });

        if (existingPolicy) {
            // Update existing policy
            existingPolicy.short_description = short_description;
            existingPolicy.description = description;
            existingPolicy.type = type;
            existingPolicy.url = url;
            if (image) existingPolicy.image = image;

            await existingPolicy.save();

            return res.status(200).json({ message: "Policy updated successfully", data: existingPolicy, error: 0 });
        }

        // Create new policy
        const newPolicy = new Policy({
            name,
            short_description,
            description,
            type,
            url,
            image
        });

        await newPolicy.save();
        res.status(201).json({ message: "Policy created successfully", data: newPolicy, error: 0 });

    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted policies
exports.getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find();
        res.status(200).json({ data: policies, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get policy by URL
exports.getPolicyByUrl = async (req, res) => {
    try {
        const { url } = req.params;
        const policy = await Policy.findOne({ url, isDeleted: false });

        if (!policy) {
            return res.status(404).json({ message: "Policy not found", error: 1 });
        }

        res.status(200).json({ data: policy, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};



// Permanent delete
exports.permanentDeletePolicy = async (req, res) => {
    try {
        const { id } = req.params;

        const policy = await Policy.findByIdAndDelete(id);

        if (!policy) {
            return res.status(404).json({ message: "Policy not found", error: 1 });
        }

        res.status(200).json({ message: "Policy permanently deleted", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
