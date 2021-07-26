//controllers for client users
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const shortId = require("shortid");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

//signup controller
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(202).json({
        errormsg: "User already registerd!",
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

        //send welcome email
        transporter.sendMail({
          to: user.email,
          from: "kasintha@nipunamu.com",
          subject: "Signup Successfull - Burger Freakz",
          html: `<html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>Burger Freakz</title>
          
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          
            <style>
              .ReadMsgBody {width: 100%; background-color: #ffffff;}
              .ExternalClass {width: 100%; background-color: #ffffff;}
          
              @-ms-viewport { 
                  width: device-width; 
              }
            </style>
          
          </head>
          <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: #e7e7e7; width: 100%; height: 100%; margin: 0; padding: 0;">
            <!-- Mail.ru Wrapper -->
            <div id="mailsub">
              <!-- Wrapper -->
              <center class="wrapper" style="table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0; margin: 0 auto; width: 100%; max-width: 960px;">
                <!-- Old wrap -->
                    <div class="webkit">
                  <table cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="padding: 0; margin: 0 auto; width: 100%; max-width: 960px;">
                    <tbody>
                      <tr>
                        <td align="center">
                          <!-- Start Section (1 column) -->
                          <table id="intro" cellpadding="0" cellspacing="0" border="0" bgcolor="#4F6331" align="center" style="width: 100%; padding: 0; margin: 0; background-image: url('https://images.pexels.com/photos/3272281/pexels-photo-3272281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); background-size: auto 102%; background-position: center center; background-repeat: no-repeat; background-color: #080e02">
                            <tbody >
                              <tr><td colspan="3" height="20"></td></tr>
                              <tr>
                                <td width="330" style="width: 33%;"></td>
                                <!-- Logo -->
                                <td width="300" style="width: 30%;" align="center">
                                
                                </td>
                                <!-- Social Button -->
                                <td width="330" style="width: 33%;" align="right">
                                  <div style="text-align: center; max-width: 150px; width: 100%;">
                                    <span>&nbsp;</span>
                                    <a href='https://web.facebook.com/Burger-Freakz-108681087536234/' target="_blank" border="0" style="border: none; outline: none; text-decoration: none; line-height: 60px; color: #ffffff; font-family: Verdana, Geneva, sans-serif;  -webkit-text-size-adjust:none">
                                      <img src='https://github.com/lime7/responsive-html-template/blob/master/index/f.png?raw=true' alt="" border="0" width="11" height="23" style="border: none; outline: none; -ms-interpolation-mode: bicubic;">
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr><td colspan="3" height="100"></td></tr>
                              <!-- Main Title -->
                              <tr>
                                <td colspan="3" height="60" align="center">
                                  <div border="0" style="border: none; line-height: 60px; color: #ffffff; font-family: Verdana, Geneva, sans-serif; font-size: 40px; text-transform: uppercase; font-weight: bolder;">Welcome To Burger Freakz!</div>
                                </td>
                              </tr>
                              <!-- Line 1 -->
                              <tr>
                                <td colspan="3" height="20" valign="bottom" align="center">
                                 <hr></hr>
                                </td>
                              </tr>
                              <!-- Meta title -->
                              <tr>
                                <td colspan="3">
                                  <table cellpadding="0" cellspacing="0" border="0" align="center" style="padding: 0; margin: 0; width: 100%;">
                                    <tbody>
                                      <tr>
                                        <td width="90" style="width: 9%;"></td>
                                        <td align="center">
                                          <div border="0" style="border: none; height: 60px;">
                                            <p style="font-size: 18px; line-height: 24px; font-family: Verdana, Geneva, sans-serif; color: #ffffff; text-align: center; mso-table-lspace:0;mso-table-rspace:0;">
                                              Hope you'll love our foods!
                                            </p>
                                          </div>
                                        </td>
                                        <td width="90" style="width: 9%;"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr><td colspan="3" height="160"></td></tr>
                              <tr>
                                <td width="330"></td>
                                <!-- Button Start -->
                                <td width="300" align="center" height="52">
                                  
                                </td>
                                <td width="330"></td>
                              </tr>
                              <tr><td colspan="3" height="85"></td></tr>
                            </tbody>
                          </table>
                </div> <!-- End Old wrap -->
              </center> <!-- End Wrapper -->
            </div> <!-- End Mail.ru Wrapper -->
          </body>
          </html>`,
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
        return res.status(202).json({ errormsg: "Invalid Credentials!" });
      }
    } else {
      return res.status(202).json({ errormsg: "Invalid Credentials!" });
    }
  });
};

exports.resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(202)
          .json({ error: "No user exists with that email!" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;

      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "kasintha@nipunamu.com",
          subject: "Password Reset - Burger Freakz",
          html: `<div style="text-align: center; 
          background-image: url('https://images.pexels.com/photos/3272281/pexels-photo-3272281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); 
          background-size: auto; background-position: center center; background-repeat: no-repeat; color: white;">
          <br>
          <h1>You have requested for a password reset!</h1>
          <br>
          <h2>Click the below button to reset the password!</h2>
          <br>
          <h4><a href="${process.env.FRONTENDAPI}/change-password/${token}" style="padding: 20px; background-color: #3dffdf;" >Reset Password</a></h4>
          <br>
          </div>
          `,
        });

        res.json({ message: "Please Check Your Email!" });
      });
    });
  });
};

exports.newPassword = (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;

  User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(202).json({ error: "Try Again Session Expired!" });
      }

      bcrypt.hash(newPassword, 12).then((hash_password) => {
        user.hash_password = hash_password;
        user.resetToken = undefined;
        user.expireToken = undefined;

        user.save().then((saveduser) => {
          res.json({ message: "Password Changed Successfully!" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
