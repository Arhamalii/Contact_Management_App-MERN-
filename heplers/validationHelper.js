const { validationResult, check } = require("express-validator");

const regsiterValidations = [
  [check("name", "Please enter your name").notEmpty()],
  [check("email", "Please Enter Valid Email ddress").isEmail()],
  [
    check(
      "password",
      "Please enter password with at least 6 characters."
    ).isLength({
      min: 6,
    }),
  ],
];
const loginValidation = [
  [check("email", "Please Enter Valid Email ddress").isEmail()],
  [check("password", "Please enter your password ").notEmpty()],
];

const contactValidation = [
  [check("name", "Please Enter Contact Name ").notEmpty()],
  [
    check("phone", "Phone Number must contain 11 digits").isLength({
      min: 11,
      max: 11,
    }),
  ],
];
module.exports = { regsiterValidations, loginValidation, contactValidation };
