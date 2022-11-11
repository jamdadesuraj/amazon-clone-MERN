const mongoose = require("mongoose");
const dotenv = require("dotenv");
const products = require("./data/products");
const Users = require("./data/Users");
const connectDb = require("./db/db");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    const createUser = await User.insertMany(Users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleData);
    console.log(`data imported !!`);
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log(`data destroy !!`);
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
