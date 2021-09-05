const express = require("express");
const { sendEmail } = require("../controller/contact");
const router = express.Router();

//backend routes for contact
router.post("/contact/sendmail", sendEmail);

module.exports = router;
