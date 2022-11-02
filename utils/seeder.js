const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/products");

// Setting dotenv file
dotenv.config({ path: "config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    process.exit();
  } catch (error) {
    process.exit();
  }
};

seedProducts();
