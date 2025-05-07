

const Register = require("../models/Register");



// Register User
exports.PostRegister = async (req, res) => {
    try {
        // Check if the email already exists
        let existingUser = await Register.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                error: "1",
                message: "Email already exists",
                details: [{ field: "email", message: "Email already exists" }]
            });
        }

        // Validate required fields
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "1",
                message: "Email and password are required",
                details: [
                    !email ? { field: "email", message: "Email is required" } : null,
                    !password ? { field: "password", message: "Password is required" } : null,
                ].filter(Boolean) // Filter out null values
            });
        }

        // Create a new instance of the Register model
        const registerBody = new Register({ email, password });

        // Save the new user
        await registerBody.save();

        // Send email (optional, if needed)
        // await send_email(mailtouser(registerBody.email));

        res.status(201).json({ error: "0", message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "1", message: "Internal server error" });
    }
};

// Get All Registered Users
exports.getallRegister = async (req, res) => {
    try {
        const data = await Register.find();
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "1", message: 'Data Not Found' });
        }
        res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "1", message: "Server error" });
    }
};

// Update User
exports.putRegister = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // Attach uploaded image path if available
        if (req.file) {
            updateData.image = req.file.path;
        }

        const user = await Register.findByIdAndUpdate(req.body._id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ error: "1", message: "User not found!" });
        }

        res.status(200).json({ message: "Data updated successfully", error: "0" });
    } catch (error) {
        console.error("Error in updating the user:", error);
        res.status(500).json({ error: "1", message: "Internal server error" });
    }
};

// Delete User
exports.deleteRegister = async (req, res) => {
    try {
        const user = await Register.findByIdAndDelete(req.body._id);

        if (!user) {
            return res.status(404).json({ error: "1", message: "User not found!" });
        }

        res.status(200).json({ message: "Deleted Successfully!" });
    } catch (err) {
        console.error("Error in deleting the user:", err);
        res.status(500).json({ error: "1", message: "Internal server error" });
    }
};

// Get User by Type
exports.getbyUser = async (req, res) => {
    try {
        const { type } = req.query; // Extract the type from req.query
        const data = await Register.find({ type: type, status: "accepted" });

        // Respond with the fetched data
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "1", message: "No users found" });
        }

        res.status(200).json({ data });
    } catch (error) {
        console.error("Error in getting users by type:", error);
        res.status(500).json({ error: "1", message: "Internal server error" });
    }
};
