const app = require("./app");

//uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message} Closing server: uncaught rejection`);
  process.exit(1);
});

//env
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./backend/config/config.env",
  });
}

//database
const connectDb = require("./config/database");
connectDb();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

//cloudinary
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//unhandled promise
process.on("unhandledRejection", (err) => {
  console.log(
    `Error: ${err.message} Closing server: unhandled promise rejection`
  );

  server.close(() => {
    process.exit(1);
  });
});
