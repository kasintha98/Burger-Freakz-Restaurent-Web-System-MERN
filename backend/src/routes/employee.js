const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { getEmployees } = require("../controller/employee");
const router = express.Router();

router.get("/employee/getemployees", getEmployees);

module.exports = router;
