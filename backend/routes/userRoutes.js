const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updataProfile,
  getAllUsersAdmin,
  getSingleUserAdmin,
  updateProfileAdmin,
  deleteProfileAdmin,
} = require("../controllers/userController");
const { isLoggedIn, authorizeRoles } = require("../middleware/authentication");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(isLoggedIn, getUserDetails);
router.route("/password/update").put(isLoggedIn, updatePassword);
router.route("/profile/update").put(isLoggedIn, updataProfile);
router
  .route("/admin/users")
  .get(isLoggedIn, authorizeRoles("admin"), getAllUsersAdmin);
router
  .route("/admin/user/:id")
  .get(isLoggedIn, authorizeRoles("admin"), getSingleUserAdmin)
  .put(isLoggedIn, authorizeRoles("admin"), updateProfileAdmin)
  .delete(isLoggedIn, authorizeRoles("admin"), deleteProfileAdmin);

module.exports = router;
