const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addPurchase,
  getPurchase,
  deletePurchase,
} = require("../controller/purchase");
const router = express.Router();

//backend routes for purchases
router.post("/purchase/add", requireSignin, adminMiddleware, addPurchase);

router.get("/purchase", getPurchase);

router.delete(
  "/purchase/delete/:id",
  requireSignin,
  adminMiddleware,
  deletePurchase
);

module.exports = router;
