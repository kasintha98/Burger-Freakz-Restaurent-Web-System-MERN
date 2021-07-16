const express = require("express");
const { sendEmail } = require("../controller/contact");
const router = express.Router();

router.post("/contact/sendmail", sendEmail);

module.exports = router;
