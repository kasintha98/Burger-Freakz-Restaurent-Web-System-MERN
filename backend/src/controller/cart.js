const Cart = require("../models/cart");

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

      //find if the product item is already added in the cart or not
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);

      let condition, updateAction;

      if (item) {
        //if item already exists in the cart update items quantity
        condition = { user: req.user._id, "cartItems.product": product };
        updateAction = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity:
                Number(item.quantity) + Number(req.body.cartItems.quantity),
            },
          },
        };
      } else {
        //if item does not exist in the cart add the new product item to cart
        condition = { user: req.user._id };
        updateAction = { $push: { cartItems: req.body.cartItems } };
      }

      //executing the condition and updateAction
      Cart.findOneAndUpdate(condition, updateAction).exec((err, _cart) => {
        if (err) {
          return res.status(400).json({ err });
        }
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    } else {
      //if cart does not exist create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((err, cart) => {
        if (err) {
          res.status(400).json(err);
        }
        if (cart) {
          res.status(201).json({ cart });
        }
      });
    }
  });
};
