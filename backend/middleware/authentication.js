const CustomError = require("../utils/customErrorClass");
const catchAsync = require("../middleware/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//logged in
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new CustomError("You must be logged in", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedData.id);
  if (!user) {
    return next(new CustomError("You must be logged in", 401));
  }
  req.user = user;
  next();
});

//check roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("Invalid access", 403));
    }
    next();
  };
};
