const Cart = require("../models/cart");
const Order = require("../models/order");
const Address = require("../models/address");

exports.addOrder = (req, res) => {
  //after adding the order we have to delete that items from cart
  Cart.deleteOne({ user: req.user._id }).exec((err, result) => {
    if (err) return res.status(400).json({ err });
    if (result) {
      req.body.user = req.user._id;

      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];

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

exports.searchOrders = (req, res) => {
  Order.find({ _id: req.body._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productImages")
    .exec((err, orders) => {
      if (err) return res.status(200).json({ err });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productImages")
    .lean()
    .exec((err, order) => {
      if (err) return res.status(400).json({ err });
      if (order) {
        Address.findOne({ user: req.user._id }).exec((err, address) => {
          if (err) return res.status(400).json({ err });
          order.address = address.addressNew.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({ order });
        });
      }
    });
};
