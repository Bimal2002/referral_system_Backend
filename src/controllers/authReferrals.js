const User = require("../models/User");
const Referral = require("../models/Referral");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");



// Fetch User Referrals
const getReferrals = async (req, res) => {
    try {
        const referrals = await Referral.find({ referrerId: req.user.id })
            .populate("referredUserId", "username email createdAt");
        res.json({ referrals });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch Referral Statistics
const getReferralStats = async (req, res) => {
    try {
        const totalReferrals = await Referral.countDocuments({ referrerId: req.user.id });
        const successfulReferrals = await Referral.countDocuments({ referrerId: req.user.id, status: "successful" });

        res.json({ totalReferrals, successfulReferrals });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View All Users (Admin Purpose)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "username email createdAt referralCode referredBy");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { 
    
    getReferrals, 
    getReferralStats, 
    getAllUsers 
};
