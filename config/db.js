const mongoose = require("mongoose");
const URI = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("DataBase is Connected");
  } catch (error) {
    console.log("ERRor", error.message);
  }
}

module.exports = connectDB;
