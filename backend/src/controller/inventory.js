const Inventory = require("../models/inventory");

exports.addInventory = async (req, res) => {
  const { name, description, qty } = req.body;

  const inventoryObj = {
    name,
    qty: Number(qty),
    description,
    addedBy: req.user._id,
  };

  //saving the new inventory object(new instance) in the mongo database
  const inv = new Inventory(inventoryObj);
  await inv.save((err, inventory) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (inventory) {
      return res.status(201).json({ inventory });
    }
  });
};

exports.getInventory = async (req, res) => {
  await Inventory.find({}).exec((err, inventory) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (inventory) {
      return res.status(200).json({ inventory });
    }
  });
};

exports.deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id)
      .then(() =>
        res.status(200).json({ msg: "Inventory Item Deleted Successfully!" })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
