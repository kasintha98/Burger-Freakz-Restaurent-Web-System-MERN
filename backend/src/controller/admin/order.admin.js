const Order = require("../../models/order");
const Address = require("../../models/address");

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

exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res.status(200).json({ orders });
};

exports.getAddressByUser = async (req, res) => {
  const id = req.params.id;
  const address = await Address.findOne({ user: id }).exec();
  res.status(200).json({ address });
};
