const catchAsync = (arg) => {
  return (req, res, next) => {
    arg(req, res, next).catch((err) => next(err));
  };
};
module.exports = catchAsync;
