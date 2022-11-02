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

router.route("/admin/users").get(allUsers);

router.route("/admin/user/:id").get(getUserDetails);
router.route("/me/update/:id").put(updateProfile);

router
  .route("/admin/user/:id")
  .get(getUserDetails)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
