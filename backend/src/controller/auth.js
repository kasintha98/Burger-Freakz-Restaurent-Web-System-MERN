//controllers for client users
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const shortId = require("shortid");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({ auth: { api_key: process.env.EMAILKEY } })
);

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

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
      gender,
      email,
      password,
      contactNumber,
      nic,
      address,
    } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      username: shortId.generate(),
      gender,
      email,
      hash_password,
      contactNumber,
      nic,
      address,
    });

    _user.save((err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Something went wrong when signup!" });
      }
      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const {
          _id,
          firstName,
          lastName,
          gender,
          email,
          contactNumber,
          fullName,
          role,
        } = user;

        //send a welcome email
        transporter.sendMail({
          to: email,
          from: "no-reply@burger-freakz.com",
          subject: "Signup Successfull - Burger Freakz",
          html: "<h1>Welcome To Burger Freakz</h1></br>Hope You Enjoj Our Food!",
        });

        return res.status(201).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            gender,
            email,
            contactNumber,
            fullName,
            role,
          },
          message: "User created successfully!",
        });
      }
    });
  });
};

//signin controller
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      const isPassword = await user.authenticate(req.body.password);

      if (isPassword && user.role === "user") {
        //making a token using jwt if user exists
        const token = generateJwtToken(user._id, user.role);

        const {
          _id,
          firstName,
          lastName,
          gender,
          email,
          nic,
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
            gender,
            email,
            nic,
            fullName,
            contactNumber,
            address,
            username,
            role,
          },
        });
      } else {
        return res.status(400).json({ message: "Something went wrong!" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!" });
    }
  });
};
