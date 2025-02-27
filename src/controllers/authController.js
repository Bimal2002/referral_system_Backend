const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const crypto = require("crypto"); // Import Node.js crypto module
// const bcrypt = require("bcrypt");


// const User = require("../models/User");
const bcrypt = require("bcryptjs");

// const User = require("../models/User");
const Referral = require("../models/Referral"); // Import Referral model
// const bcrypt = require("bcryptjs");

// const User = require("../models/User");
// const Referral = require("../models/Referral");
// const bcrypt = require("bcryptjs");

const registerUser1 = async (req, res) => {
    try {
        const { username, email, password, referralCode } = req.body;
        console.log(referralCode)
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique referral code for the new user
        const userReferralCode = `${username}_ref`;

        // Find the user who referred this new user (if referral code is provided)
        let referredBy = null;
        let referrer = null;

        if (referralCode) {
            referrer = await User.findOne({ referralCode });
            if (referrer) {
                referredBy = referralCode; 
            } else {
                return res.status(400).json({ message: "Invalid referral code" });
            }
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            referralCode: userReferralCode,
            referredBy, 
        });

        await newUser.save();

        if (referrer) {
            await Referral.findOneAndUpdate(
                { referrerId: referrer._id }, 
                { $push: { referredUsers: { userId: newUser._id } } }, 
                { upsert: true, new: true } 
            );
        }

        res.status(201).json({
            message: "User registered",
            referralCode: userReferralCode,
            referredBy
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password, referredBy } = req.body;
        console.log(referredBy)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userReferralCode = `${username}_ref`;

        let referredBy1 = null;
        let referrer = null;
        
        let referralCode = referredBy;
        if (referredBy) {
            referrer = await User.findOne({referralCode });
            if (referrer) {
                referredBy1 = referralCode;
            } else {
                return res.status(400).json({ message: "Invalid referral code" });
            }
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            referralCode: userReferralCode,
            referredBy, 
        });

        await newUser.save();

        if (referrer) {
            await Referral.findOneAndUpdate(
                { referrerId: referrer._id }, 
                { $push: { referredUsers: { userId: newUser._id } } },
                { upsert: true, new: true } 
            );
        }

        res.status(201).json({
            message: "User registered",
            referralCode: userReferralCode,
            referredBy
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

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

        console.log("Generated Reset Token:", resetToken); 

        res.json({ message: "Use this token for password reset", resetToken });
    } catch (error) {
        console.error("Forgot Password Error:", error); 
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        const user = await User.findOne({
            resetToken: { $ne: null },  
            resetTokenExpiry: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetToken);

        if (!isTokenValid) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

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
