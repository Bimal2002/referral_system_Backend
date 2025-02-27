const User = require("../models/User");
const Referral = require("../models/Referral");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");



const getReferrals = async (req, res) => {
    try {
        const userId = req.user.id; 

        const referrals = await Referral.find({ referrerId: userId })
            .populate("referredUsers.userId", "username email referralCode") 
            .exec();

        res.status(200).json({ referrals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};




const getReferralStats = async (req, res) => {
    try {
        const referral = await Referral.findOne({ referrerId: req.user.id });

        if (!referral) {
            return res.status(404).json({ message: "No referral data found" });
        }

        const totalReferrals = referral.referredUsers.length;

        const successfulReferrals = referral.referredUsers.filter(
            (referredUser) => referredUser.status === "successful"
        ).length;

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
