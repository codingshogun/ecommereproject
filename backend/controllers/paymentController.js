const catchAsync = require("../middleware/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsync(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "shop",
    },
  });
  res.status(200).json({
    status: "successful",
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEy,
  });
});
