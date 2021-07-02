const User = require("../models/user");

exports.getEmployees = (req, res) => {
  User.find({}).exec((err, employees) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (employees) {
      return res.status(200).json({ employees });
    }
  });
};
