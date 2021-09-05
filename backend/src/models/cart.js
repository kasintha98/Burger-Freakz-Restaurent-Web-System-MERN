//cart model (cart table) is created using mongoose schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating new schema
const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true } //automatically stores date created/modified
);

const Cart = mongoose.model("Cart", cartSchema); //User mean model name. we can use any name like variable name

module.exports = Cart;
