const Contact = require("../models/Contact"); // Adjust the path based on your folder structure

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const data = req.body; // Dynamically take fields from request body
        if (req.file) {
            data.image = req.file.path;
        }

        const contact = new Contact(data);
        await contact.save();

        res.status(201).json({ message: "Contact created successfully", contact, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ data: contacts, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found", error: 1 });
        }

        res.status(200).json({ contact, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body; // Dynamically take fields from request body
        if (req.file) {
            data.image = req.file.path; // If an image is uploaded, save the path
        }

        const contact = await Contact.findByIdAndUpdate(id, data, { new: true });

        if (!contact) {
            return res.status(404).json({ message: "Contact not found", error: 1 });
        }

        res.status(200).json({ message: "Contact updated successfully", contact, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found", error: 1 });
        }

        res.status(200).json({ message: "Contact deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
