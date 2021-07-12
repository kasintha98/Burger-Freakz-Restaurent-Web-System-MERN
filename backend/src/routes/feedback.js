const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addFeedback, getFeedback } = require("../controller/feedback");

const router = express.Router();

router.post("/feedback/add", requireSignin, userMiddleware, addFeedback);
router.get("/feedback/getFeedback/:id", getFeedback);

module.exports = router;
