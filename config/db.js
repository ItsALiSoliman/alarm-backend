const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/alarmDB");

    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database Connection Error: ", err);
    process.exit(1);
  }
};
module.exports = connectDB;
