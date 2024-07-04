const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "YOOOOOOOOO";
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exist, please try a different email",
        success: false,
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: "User",
    });

    const jwtToken = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    await newUser.save();

    res.status(200).json({
      message: "Registration Success",
      success: true,
      jwtToken,
      email,
      name: firstName + " " + lastName,
      role: "User",
    });
    console.log("User registered successfully");
  } catch (error) {
    res.status(400).send(error);
    console.log("Error in post register: " + error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Email does not exist", success: false });
    }
    if (user.role !== "Admin") {
      const isPassCorrect = await bcrypt.compare(password, user.password);
      console.log(isPassCorrect);
      if (!isPassCorrect) {
        return res
          .status(403)
          .json({ message: "Please enter correct password", success: false });
      }
    }else{
        if(password!==user.password){
            return res
          .status(403)
          .json({ message: "Please enter correct password", success: false });
        }
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: "24h",
    });
    console.log(token);
    res.status(200).json({
      message: "Login Success",
      success: true,
      token,
      email,
      name: user.firstName + " " + user.lastName,
      role: user.role,
    });
  } catch (error) {
    res.status(400).send("Error logging in");
  }
};

module.exports = { register, login };
