const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

//multiple file(category image) upload using multer as an array
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.array("categoryImages"),
  addCategory
);

router.get("/category/getcategories", getCategories);

router.post(
  "/category/update",
  requireSignin,
  adminMiddleware,
  upload.array("categoryImages"),
  updateCategory
);

router.delete("/category/:id", requireSignin, adminMiddleware, deleteCategory);

module.exports = router;
