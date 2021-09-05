//inial data that is neede in the admin-app
const express = require("express");

const { initialData } = require("../../controller/admin/initialData");
const router = express.Router();

//backend routes for initial data
router.post("/initialdata", initialData);

module.exports = router;
