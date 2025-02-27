const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referredUsers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            dateReferred: { type: Date, default: Date.now },
            status: { type: String, enum: ["pending", "successful"], default: "pending" }
        }
    ]
});

module.exports = mongoose.model("Referral", ReferralSchema);
