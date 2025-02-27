const express = require("express");
const { registerUser, loginUser ,forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router(); 
// const express = require("express");
const { getReferrals, getReferralStats, getAllUsers } = require("../controllers/authReferrals");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");


router.get("/referrals", authMiddleware, getReferrals);
router.get("/stats", authMiddleware, adminMiddleware, getReferralStats);  
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);  



router.post("/register", registerUser);
router.post("/login", loginUser);



router.post("/forgot-password", forgotPassword);


router.post("/reset-password", resetPassword); 

module.exports = router;


// const express = require("express");
// const router = express.Router(); 

// const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/authController");
// const { getReferrals, getReferralStats, getAllUsers } = require("../controllers/authReferrals");
// const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// //  Referral System Routes
// router.get("/referrals", authMiddleware, getReferrals);
// router.get("/stats", authMiddleware, adminMiddleware, getReferralStats);
// router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// //  Authentication Routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// module.exports = router;
