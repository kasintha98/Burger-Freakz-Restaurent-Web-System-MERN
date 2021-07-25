//routers for client users
const express = require("express");
const {
  signup,
  signin,
  resetPassword,
  newPassword,
} = require("../controller/auth");
const {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequestUser,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequestUser, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/reset-password", resetPassword);
router.post("/new-password", newPassword);

/* router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: "profile" });
}); */

module.exports = router;
