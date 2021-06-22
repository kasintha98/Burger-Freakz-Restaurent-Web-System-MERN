const Order = require("../../models/order");

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((err, order) => {
    if (err) return res.status(400).json({ err });
    if (order) {
      res.status(201).json({ order });
    }
  });
};
