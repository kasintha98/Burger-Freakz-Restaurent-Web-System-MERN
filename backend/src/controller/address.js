const UserAddress = require("../models/address");

exports.addAddress = (req, res) => {
  const { payload } = req.body;
  if (payload.addressNew) {
    UserAddress.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          addressNew: payload.addressNew,
        },
      },
      { new: true, upsert: true }
    ).exec((error, addressNew) => {
      if (error) return res.status(400).json({ error });
      if (addressNew) {
        res.status(201).json({ addressNew });
      }
    });
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
};
