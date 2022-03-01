const CustomError = require("../utils/customErrorClass");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "something went wrong";

  //wrong db id
  if (err.name === "CastError") {
    err = new CustomError(`Invalid ${err.path}`, 400);
  }

  //duplicate value
  if (err.code === 11000) {
    err = new CustomError(`Duplicate ${Object.keys(err.keyValue)}`, 400);
  }

  //json web token error
  if (err.name === "JsonWebTokenError") {
    err = new CustomError(`Session expired, Please login`, 400);
  }

  //json web token expired
  if (err.name === "TokenExpiredError") {
    err = new CustomError(`Session Expired, Please login`, 400);
  }

  res.status(err.statusCode).json({
    status: "error",
    error: err.message,
  });
};
