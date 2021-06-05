const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressNew: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
});

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    addressNew: [addressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAddress", userAddressSchema);
