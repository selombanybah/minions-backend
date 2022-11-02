const express = require("express");
const app = express();
const path = require("path");

var util = require("util");
var encoder = new util.TextEncoder("utf-8");

const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const cloudinary = require("cloudinary");

const errorMiddleware = require("./middlewares/errors");

// setting up config file
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Setting upcloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import all routes
const auth = require("./routes/auth");

// app.use(express.static(path.join("public")));

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/v1", auth);

// app.use("/", (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
