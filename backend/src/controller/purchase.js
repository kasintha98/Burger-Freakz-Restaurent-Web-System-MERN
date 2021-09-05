const Purchase = require("../models/purchase");

//add a new purchase
exports.addPurchase = async (req, res) => {
  const { title, description, qty, unitPrice, addedBy } = req.body;

  const purchaseObj = {
    title,
    description,
    qty: Number(qty),
    unitPrice,
    addedBy: req.user._id,
  };

  //saving the new purchase object(new instance) in the mongo database
  const pur = new Purchase(purchaseObj);
  await pur.save((err, purchase) => {
    if (err) {
      return res.status(202).json({ error: err });
    }
    if (purchase) {
      return res
        .status(201)
        .json({ purchase, msg: "Purchase added successfully!" });
    }
  });
};

exports.getPurchase = async (req, res) => {
  await Purchase.find({}).exec((err, purchase) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (purchase) {
      return res.status(200).json({ purchase });
    }
  });
};

exports.deletePurchase = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id)
      .then(() =>
        res.status(200).json({ msg: "Purchase Item Deleted Successfully!" })
      )
      .catch((err) => res.status(202).json({ error: err }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
