const Cart = require("../models/cart");
const Order = require("../models/order");
const Address = require("../models/address");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.addOrder = (req, res) => {
  //after adding the order we have to delete that items from cart
  Cart.deleteOne({ user: req.user._id }).exec((err, result) => {
    if (err) return res.status(400).json({ err });
    if (result) {
      const usrObj = req.body.user;
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

      //send email
      transporter.sendMail({
        to: usrObj.email,
        from: "kasintha@nipunamu.com",
        subject: "Order Placed Successfully - Burger Freakz",
        html: `<div style="text-align: center; 
        background-image: url('https://images.pexels.com/photos/3272281/pexels-photo-3272281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'); 
        background-size: auto; background-position: center center; background-repeat: no-repeat; color: white;">
        <h1>Thank You & We Recieved Your Order!</h1>
        <br>
        <h2>Grand Total : ${req.body.totalAmount}</h2>
        <h2>Payment Type : ${req.body.paymentType}</h2>
        <h2>Payment Status : ${req.body.paymentStatus}</h2>
        
        <h1>For More Information Please Visit Your Burger Freakz Account Profile!</h1>
        </div>`,
      });

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

          if (address) {
            order.address = address.addressNew.find(
              (adr) => adr._id.toString() == order.addressId.toString()
            );
            res.status(200).json({ order });
          }
        });
      }
    });
};
