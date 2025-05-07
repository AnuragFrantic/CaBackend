const Service = require("../models/Service");
const slugify = require("slugify");

// Create a new service
exports.createService = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? req.file.path : null;

        // Generate a unique URL slug
        let baseSlug = slugify(title, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        while (await Service.findOne({ url: slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        const service = new Service({
            title,
            image,
            url: slug
        });

        await service.save();

        res.status(201).json({ message: "Service created successfully", data: service, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all non-deleted services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ isDeleted: false });
        res.status(200).json({ data: services, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single service by ID (only if not deleted)
exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findOne({ _id: id, isDeleted: false });

        if (!service) {
            return res.status(404).json({ message: "Service not found", error: 1 });
        }

        res.status(200).json({ data: service, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a service by ID (only if not deleted)
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const updatedData = { title };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        if (title) {
            let baseSlug = slugify(title, { lower: true, strict: true });
            let slug = baseSlug;
            let count = 1;

            while (await Service.findOne({ url: slug, _id: { $ne: id } })) {
                slug = `${baseSlug}-${count++}`;
            }

            updatedData.url = slug;
        }

        const service = await Service.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: "Service not found", error: 1 });
        }

        res.status(200).json({ message: "Service updated successfully", data: service, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Soft delete a service by ID
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: "Service not found or already deleted", error: 1 });
        }

        res.status(200).json({ message: "Service soft-deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
