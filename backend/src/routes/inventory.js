const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addInventory,
  getInventory,
  deleteInventory,
} = require("../controller/inventory");
const router = express.Router();

//backend routes for inventory
router.post("/inventory/add", requireSignin, adminMiddleware, addInventory);

router.get("/inventory", getInventory);

router.delete(
  "/inventory/delete/:id",
  requireSignin,
  adminMiddleware,
  deleteInventory
);

module.exports = router;
