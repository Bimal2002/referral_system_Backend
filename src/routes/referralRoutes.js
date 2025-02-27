const express = require("express");
const { getReferrals, getReferralStats, getAllUsers } = require("../controllers/authReferrals");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/referrals", authMiddleware, getReferrals);
router.get("/stats", authMiddleware, adminMiddleware, getReferralStats);  
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);  

module.exports = router;
