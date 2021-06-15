const Cart = require("../models/cart");
const Order = require("../models/order");

exports.addOrder = (req, res) => {
  //after adding the order we have to delete that items from cart
  Cart.deleteOne({ user: req.user._id }).exec((err, result) => {
    if (err) return res.status(400).json({ err });
    if (result) {
      req.body.user = req.user._id;
      const order = new Order(req.body);
      order.save((err, order) => {
        if (err) return res.status(400).json({ err });
        if (order) {
          res.status(201).json({ order });
        }
      });
    }
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productImages")
    .exec((err, orders) => {
      if (err) return res.status(400).json({ err });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};
