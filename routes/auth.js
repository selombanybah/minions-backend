const express = require("express");
const router = express.Router();

const {
  allUsers,
  getUserDetails,
  registerUser,
  updateUser,
  deleteUser,
  updateProfile,
} = require("../controllers/authController");

router.route("/register").post(registerUser);

// router.route("/me").get(isAuthenticatedUser, getUserProfile);

router.route("/profiles").get(allUsers);

router.route("/admin/user/:id").get(getUserDetails);
router.route("/me/update/:id").put(updateProfile);
router.route("/profile/:id").get(getUserDetails);

router.route("/admin/user/:id").delete(deleteUser);

module.exports = router;
