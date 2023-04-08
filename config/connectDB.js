const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;
