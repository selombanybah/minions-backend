const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

const dotenv = require("dotenv");

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`ERROR: ${err.message}`);
  console.error(`Shuting down server due to uncaught exception`);
  process.exit(1);
});

// setting up config file
dotenv.config({ path: "config/config.env" });

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shuting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
