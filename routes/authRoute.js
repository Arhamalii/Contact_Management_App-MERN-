const express = require("express");
const {
  registerController,
  loginController,
  getLoginDataController,
} = require("../controllers/authController");
const {
  regsiterValidations,
  loginValidation,
} = require("../heplers/validationHelper");
const auth = require("../middlewares/auth");

const router = express.Router();

// routes
router.post("/register", regsiterValidations, registerController);
router.post("/login", loginValidation, loginController);
router.get("/", auth, getLoginDataController);

module.exports = router;
