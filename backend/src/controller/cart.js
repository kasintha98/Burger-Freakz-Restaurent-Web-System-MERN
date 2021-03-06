const { response } = require("express");
const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCart = (req, res) => {
  //one user can only have one cart. in this one cart he can have multiple products
  //checking if the users cart already exist or not
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) {
      //if an error happen
      return res.status(400).json({ err });
    }
    if (cart) {
      //if cart already exists then update cart by quantity
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        //find if the product item is already added in the cart or not
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);

        let condition, updateAction;

        if (item) {
          //if item already exists in the cart update items quantity
          condition = { user: req.user._id, "cartItems.product": product };
          updateAction = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          //if item does not exist in the cart add the new product item to cart
          condition = { user: req.user._id };
          updateAction = { $push: { cartItems: cartItem } };
        }

        promiseArray.push(runUpdate(condition, updateAction));
        //executing the condition and updateAction
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      //if cart does not exist create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((err, cart) => {
        if (err) {
          res.status(400).json({ err });
        }
        if (cart) {
          res.status(201).json({ cart });
        }
      });
    }
  });
};

//get items in the cart
exports.getCartItems = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productImages offer")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productImages[0].img,
            price: item.product.price,
            qty: item.quantity,
            offer: item.product.offer,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
};

//remove items in the cart
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      { $pull: { cartItems: { product: productId } } }
    ).exec((err, result) => {
      if (err) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
