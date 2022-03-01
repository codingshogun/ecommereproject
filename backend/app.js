const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

//env
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./backend/config/config.env",
  });
}

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//routes
const product = require("./routes/productRoutes");
const order = require("./routes/orderRoutes");
const user = require("./routes/userRoutes");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", user);
app.use("/api/v1", payment);

//path
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//global error handler
const errorHandler = require("./middleware/globalErrorHandler");
app.use(errorHandler);

module.exports = app;
