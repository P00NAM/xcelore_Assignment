require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // make sure you have this model

const app = express();
app.use(cors());
app.use(express.json());

// Set the view engine to EJS
//app.set('view engine', 'ejs');
/*app.set('views', path.join(__dirname, 'views')); */

//connecting to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/xceloreDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello sweetie");
});

app.listen(3000, () => console.log("Server running on port 5000"));
