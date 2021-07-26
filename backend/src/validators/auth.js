const { check, validationResult } = require("express-validator");

//validating user inputs in signup using express validator

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First name is required!"),
  check("lastName").notEmpty().withMessage("Last name is required!"),
  check("email").isEmail().withMessage("Please enter a valid email!"),
  check("nic").notEmpty().withMessage("NIC is required!"),
  check("nic")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter a valid NIC number!"),
  check("gender").notEmpty().withMessage("Gender is required!"),
  check("role").notEmpty().withMessage("Role is required!"),
  check("contactNumber").notEmpty().withMessage("Contact number is required!"),
  check("contactNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter a valid contact number!"),
  check("address").notEmpty().withMessage("Address is required!"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!"),
];

exports.validateSignupRequestUser = [
  check("firstName").notEmpty().withMessage("First name is required!"),
  check("lastName").notEmpty().withMessage("Last name is required!"),
  check("email").isEmail().withMessage("Please enter a valid email!"),
  check("nic").notEmpty().withMessage("NIC is required!"),
  check("nic")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter a valid NIC number!"),
  check("contactNumber").notEmpty().withMessage("Contact number is required!"),
  check("contactNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter a valid contact number!"),
  check("address").notEmpty().withMessage("Address is required!"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!"),
  check("gender").notEmpty().withMessage("Gender is required!"),
];

//validating user inputs in signin using express validator
exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Please enter a valid email!"),
  check("password").notEmpty().withMessage("Password can't be empty!"),
];

//checking validation results
exports.isRequestValidated = (req, res, next) => {
  //storing validation errors from the request in an array and showing it
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    //if errors exists in the errors array showing them
    return res.status(202).json({ errormsg: errors.array()[0].msg });
  }
  next();
};
