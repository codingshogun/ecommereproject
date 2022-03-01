const express = require("express");
const router = express.Router();
const {
  createOrder,
  getSingleOrderAdmin,
  getUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isLoggedIn, authorizeRoles } = require("../middleware/authentication");

router.route("/order/new").post(isLoggedIn, createOrder);
router.route("/order/me").get(isLoggedIn, getUserOrders);
router.route("/order/:id").get(isLoggedIn, getSingleOrderAdmin);
router
  .route("/admin/orders")
  .get(isLoggedIn, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, authorizeRoles("admin"), updateOrder)
  .delete(isLoggedIn, authorizeRoles("admin"), deleteOrder);

module.exports = router;
