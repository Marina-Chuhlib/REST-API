const mongoose = require("mongoose");

const { DB_URI } = process.env;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;
