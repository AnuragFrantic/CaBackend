const { default: slugify } = require("slugify");
const RegulatoryDetail = require("../models/RegulatoryDetail");



const generateUniqueSlug = async (Model, title, idToExclude = null) => {
    let baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing = await Model.findOne({
            url: slug,
            ...(idToExclude ? { _id: { $ne: idToExclude } } : {})
        });

        if (!existing) break;

        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};

// Create a new RegulatoryDetail
exports.createRegulatoryDetail = async (req, res) => {
    try {
        const { title, short_description, description, reg_id } = req.body;
        const image = req.file ? req.file.path : null;

        const url = await generateUniqueSlug(RegulatoryDetail, title);

        const detail = new RegulatoryDetail({
            title,
            short_description,
            description,
            image,
            url,
            reg_id,
        });

        await detail.save();
        res.status(201).json({ message: "RegulatoryDetail created", data: detail, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted RegulatoryDetails
exports.getAllRegulatoryDetails = async (req, res) => {
    try {
        const details = await RegulatoryDetail.find({ isDeleted: false }).populate("reg_id", "title");
        res.status(200).json({ data: details, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single RegulatoryDetail by ID
exports.getRegulatoryDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await RegulatoryDetail.findOne({ _id: id, isDeleted: false }).populate("reg_id", "title");

        if (!detail) {
            return res.status(404).json({ message: "RegulatoryDetail not found", error: 1 });
        }

        res.status(200).json({ data: detail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a RegulatoryDetail
exports.updateRegulatoryDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, short_description, description, reg_id } = req.body;

        const url = await generateUniqueSlug(RegulatoryDetail, title, id);

        const updatedData = {
            title,
            short_description,
            description,
            reg_id,
            url,
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const detail = await RegulatoryDetail.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!detail) {
            return res.status(404).json({ message: "RegulatoryDetail not found", error: 1 });
        }

        res.status(200).json({ message: "RegulatoryDetail updated", data: detail, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Soft delete a RegulatoryDetail
exports.deleteRegulatoryDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await RegulatoryDetail.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!detail) {
            return res.status(404).json({ message: "RegulatoryDetail not found or already deleted", error: 1 });
        }

        res.status(200).json({ message: "RegulatoryDetail soft-deleted", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};


exports.getRegDetailByService = async (req, res) => {
    try {
        const { reg_id } = req.params;

        const details = await RegulatoryDetail.find({
            reg_id: reg_id,
            isDeleted: false
        }).select('_id title url');

        res.status(200).json({ data: details, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};



exports.getRegDetialByUrl = async (req, res) => {
    try {
        const { url } = req.params;

        const detail = await RegulatoryDetail.findOne({ url, isDeleted: false }).populate("reg_id", "title");

        if (!detail) {
            return res.status(404).json({ message: "Regulatory Detail not found", error: 1 });
        }

        res.status(200).json({ data: detail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};