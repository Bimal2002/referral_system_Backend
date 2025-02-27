// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     referralCode: { type: String, unique: true },
//     referredBy: { type: String },
//     resetToken: { type: String }, // For password reset
//     resetTokenExpiry: { type: Date } // Expiry for reset token
// });

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true },
    referredBy: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" } 
});

module.exports = mongoose.model("User", userSchema);
