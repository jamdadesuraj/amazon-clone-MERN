const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
  }
};

module.exports = connectDb;
