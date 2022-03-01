const Product = require("../models/productModel");
const CustomError = require("../utils/customErrorClass");
const catchAsync = require("../middleware/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create product
exports.createProduct = catchAsync(async (req, res) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "ecommerceimg",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "successful",
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.dbQuery;

  res.status(200).json({
    status: "successful",
    productsCount,
    products,
    resultPerPage,
  });
});

exports.getAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "successful",
    products,
  });
});

//get product details
exports.getProductDetails = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("No product found", 404));
  }
  res.status(200).json({
    status: "successful",
    product,
  });
});

//update products
exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("No product found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "ecommerceimg",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindByIdAndUpdate: false,
  });
  res.status(200).json({
    status: "successful",
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("No product found", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    status: "successful",
    message: "Product deleted",
  });
});

//reviews
exports.createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user._id.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        (r.rating = rating), (r.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let total = 0;
  product.reviews.forEach((rev) => (total += rev.rating));
  product.avgRating = total / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    status: "successful",
    product,
  });
});

//get reviews
exports.getProductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new CustomError("No product", 404));
  }
  res.status(200).json({
    status: "successful",
    reviews: product.reviews,
  });
});

//delete review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new CustomError("No product", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev.id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const avgRating = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      avgRating: avgRating || 0,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    status: "successful",
  });
});
