require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/referral_app",
    JWT_SECRET: process.env.JWT_SECRET || "Kgp@1951",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
    RATE_LIMIT: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100 // Limit each IP to 100 requests per window
    }
    // ,
    // MAIL_CONFIG: {
    //     service: "Gmail",
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // }
};
