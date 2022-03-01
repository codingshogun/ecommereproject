const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authentication");

router.route("/payment/process").post(isLoggedIn, processPayment);
router.route("/stripeapikey").get(isLoggedIn, sendStripeApiKey);

module.exports = router;
