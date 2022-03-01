const User = require("../models/userModel");
const CustomError = require("../utils/customErrorClass");
const catchAsync = require("../middleware/catchAsync");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register
exports.createUser = catchAsync(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "ecommerceImg",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profileImg: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });
  sendToken(user, 201, res);
});

//login
exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new CustomError("Email and Password required", 401));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new CustomError("No user found with that Email", 401));
  }
  const isPasswordCorrect = await user.comparePassword(req.body.password);
  if (!isPasswordCorrect) {
    return next(new CustomError("Incorrect Email or Password", 401));
  }
  sendToken(user, 200, res);
});

//logout
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "successful",
    message: "Logged out",
  });
});

//forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new CustomError("No account found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Click the link below to reset your password. \n\n ${resetPasswordUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset link",
      message: message,
    });

    res.status(200).json({
      status: "successful",
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new CustomError(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  if (!req.body.password) {
    return next(new CustomError("password required", 400));
  }
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError("Timed out", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new CustomError("Passwords dont match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.save();
  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "successful",
    user,
  });
});

//update user password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isOldPassword = await user.comparePassword(req.body.oldPassword);
  if (!isOldPassword) {
    return next(new CustomError("Old password is incorrect", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new CustomError("Passwords dont match", 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//update profile
exports.updataProfile = catchAsync(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    await cloudinary.v2.uploader.destroy(user.profileImg.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "ecommerceImg",
      width: 150,
      crop: "scale",
    });
    newData.profileImg = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    status: "successful",
    user,
  });
});

//get all users admin
exports.getAllUsersAdmin = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "successful",
    users,
  });
});

//get single user admin
exports.getSingleUserAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError("No user found", 404));
  }
  res.status(200).json({
    status: "successful",
    user,
  });
});

//update profile
exports.updateProfileAdmin = catchAsync(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    status: "successful",
    user,
  });
});

//delete profile admin
exports.deleteProfileAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError("No user found", 400));
  }
  await user.remove();
  res.status(200).json({
    status: "successful",
    message: "user deleted",
  });
});
