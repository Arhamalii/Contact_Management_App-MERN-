const User = require("../model/User");
const { hasPassword, comparePassword } = require("../heplers/authHelper");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        succeess: false,
        message: errors.array(),
      });
    }
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        succeess: false,
        message: "User with this email already exists",
      });
    }
    user = await new User({
      name,
      email,
      password,
    });
    user.password = await hasPassword(password);

    await user.save();
    res.status(201).send({
      success: true,
      message: "Register Succesfully ",
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        succeess: false,
        message: errors.array(),
      });
    }
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        succeess: false,
        message: "User With this Email doesn't Exist",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        succeess: false,
        message: "Invalid Password",
      });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });

    res.status(200).send({
      succeess: true,
      message: "Login Successfully",
      users: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const getLoginDataController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getLoginDataController,
};
