const express = require("express");
const {
  authController,
  getUserProfle,
  registerUser,
  updatedUserProfile,
} = require("../controller/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);

router.post("/login", authController);

router
  .route("/profile")
  .get(protect, getUserProfle)
  .put(protect, updatedUserProfile);

module.exports = router;
