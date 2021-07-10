const {
  requireSignin,
  userMiddleware,
  adminMiddleware,
} = require("../common-middleware");
const {
  addOrder,
  getOrders,
  getOrder,
  searchOrders,
} = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/searchOrders", searchOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);

module.exports = router;
