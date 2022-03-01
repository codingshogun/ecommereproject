const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isLoggedIn, authorizeRoles } = require("../middleware/authentication");

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isLoggedIn, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isLoggedIn, authorizeRoles("admin"), updateProduct)
  .delete(isLoggedIn, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isLoggedIn, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isLoggedIn, deleteReview);

router
  .route("/admin/products")
  .get(isLoggedIn, authorizeRoles("admin"), getAdminProducts);

module.exports = router;
