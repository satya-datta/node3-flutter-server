const mongoose = require("mongoose");
require('dotenv').config();
const dbUri = process.env.MONGODB_URI || "mongodb+srv://user1:ksd1234l@cluster1compass.dxrppaw.mongodb.net/ksd3";
const connection = mongoose.createConnection(dbUri);

connection.on("open", () => {
  console.log("MongoDB connected");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = connection;
