const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const CustomError = require("../utils/customErrorClass");
const catchAsync = require("../middleware/catchAsync");

//create order
exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    status: "successful",
    order,
  });
});

//get single order
exports.getSingleOrderAdmin = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new CustomError("No order found", 404));
  }
  res.status(200).json({
    status: "successful",
    order,
  });
});

//get logged in user order
exports.getUserOrders = catchAsync(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return next(new CustomError("No order found", 404));
  }
  res.status(200).json({
    status: "successful",
    order,
  });
});

//get all orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate(
    "orderItems.product",
    "name price"
  );
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(200).json({
    status: "successful",
    orders,
    totalAmount,
  });
});

//update order
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new CustomError("No order found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new CustomError("Order delivered", 400));
  }
  order.orderItems.forEach(async (item) => {
    console.log(item);
    await updateStock(item.product, item.quantity);
  });
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "successful",
    success: true,
    order,
  });
});

//update function
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete order
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new CustomError("No order found", 404));
  }
  await order.remove();
  res.status(200).json({
    status: "successful",
    message: "deleted",
    success: true,
  });
});
