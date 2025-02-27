const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const crypto = require("crypto"); // Import Node.js crypto module
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, referralCode } = req.body;

        let existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            referralCode: username + "_ref",
            referredBy: referralCode || null
        });

        await newUser.save();
        res.status(201).json({ message: "User registered", referralCode: newUser.referralCode });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Find user by email OR username OR Both
        const user = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // JWT token
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Store token & expiry in database
        user.resetToken = hashedToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        console.log("Generated Reset Token:", resetToken); // Debugging

        // Simulating an email by returning the resetToken in response (For testing)
        res.json({ message: "Use this token for password reset", resetToken });
    } catch (error) {
        console.error("Forgot Password Error:", error); // Log the actual error
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        // Find user by resetToken
        const user = await User.findOne({ resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Compare stored hashed token with the received token
        const isTokenValid = await bcrypt.compare(token, user.resetToken);
        if (!isTokenValid) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = { registerUser, loginUser, forgotPassword,resetPassword };
