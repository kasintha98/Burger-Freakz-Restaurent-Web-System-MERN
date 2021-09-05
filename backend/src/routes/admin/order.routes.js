const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  updateOrder,
  getCustomerOrders,
  getAddressByUser,
} = require("../../controller/admin/order.admin");
const router = express.Router();

//backend routes for admin order
router.post("/order/update", requireSignin, adminMiddleware, updateOrder);

router.post(
  "/order/getCustomerOrders",
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

router.get("/order/getAddressByUser/:id", getAddressByUser);

module.exports = router;
