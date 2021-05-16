//controllers for client users
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

//signup controller
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registerd!",
      });

    const {
      firstName,
      lastName,
      nic,
      gender,
      email,
      password,
      contactNumber,
      address,
    } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      username: Math.random().toString(),
      nic,
      gender,
      email,
      hash_password,
      contactNumber,
      address,
    });

    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({ message: "Something went wrong!" });
      }
      if (data) {
        return res.status(201).json({ message: "User created successfully!" });
      }
    });
  });
};

//signin controller
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        //making a token using jwt if user exists
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "100d",
          }
        );
        const {
          _id,
          firstName,
          lastName,
          nic,
          gender,
          email,
          fullName,
          contactNumber,
          address,
          username,
          role,
        } = user;
        //returning repond after successfull signin
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            nic,
            gender,
            email,
            fullName,
            contactNumber,
            address,
            username,
            role,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid Password!" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!" });
    }
  });
};
