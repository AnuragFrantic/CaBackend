const { default: slugify } = require("slugify");
const ServiceDetail = require("../models/ServiceDetail");

// Create a new ServiceDetail


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

exports.createServiceDetail = async (req, res) => {
    try {
        const { title, short_description, description, service_id } = req.body;
        const image = req.file ? req.file.path : null;

        const url = await generateUniqueSlug(ServiceDetail, title);

        const detail = new ServiceDetail({
            title,
            short_description,
            description,
            image,
            url,
            service_id,
        });

        await detail.save();
        res.status(201).json({ message: "ServiceDetail created", data: detail, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};


// Get all non-deleted ServiceDetails
exports.getAllServiceDetails = async (req, res) => {
    try {
        const details = await ServiceDetail.find({ isDeleted: false }).populate("service_id", "title");
        res.status(200).json({ data: details, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single ServiceDetail by ID
exports.getServiceDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await ServiceDetail.findOne({ _id: id, isDeleted: false }).populate("service_id", "title");

        if (!detail) {
            return res.status(404).json({ message: "ServiceDetail not found", error: 1 });
        }

        res.status(200).json({ data: detail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a ServiceDetail
exports.updateServiceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, short_description, description, service_id } = req.body;

        const url = await generateUniqueSlug(ServiceDetail, title, id);

        const updatedData = {
            title,
            short_description,
            description,
            service_id,
            url,
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const detail = await ServiceDetail.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!detail) {
            return res.status(404).json({ message: "ServiceDetail not found", error: 1 });
        }

        res.status(200).json({ message: "ServiceDetail updated", data: detail, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Soft delete a ServiceDetail
exports.deleteServiceDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await ServiceDetail.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!detail) {
            return res.status(404).json({ message: "ServiceDetail not found or already deleted", error: 1 });
        }

        res.status(200).json({ message: "ServiceDetail soft-deleted", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};



exports.getServiceDetailsByService = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const details = await ServiceDetail.find({
            service_id: serviceId,
            isDeleted: false
        }).select('_id title url');

        res.status(200).json({ data: details, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};


exports.getServiceDetailByUrl = async (req, res) => {
    try {
        const { url } = req.params;

        const detail = await ServiceDetail.findOne({ url, isDeleted: false }).populate("service_id", "title");

        if (!detail) {
            return res.status(404).json({ message: "ServiceDetail not found", error: 1 });
        }

        res.status(200).json({ data: detail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};