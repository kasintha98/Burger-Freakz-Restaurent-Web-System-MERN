const Product = require("../models/product");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  //res.status(200).json({ file: req.files, body: req.body });

  ///destructuring the request body and getting all the elements separately for easy use
  const {
    name,
    price,
    quantity,
    description,
    offer,
    feedbacks,
    ratings,
    category,
    updatedAt,
  } = req.body;

  //saving all produt images uploaded in an array
  let productImages = [];

  //if productImages exists then mapping them to a array of objects as needed in the product schema
  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  //creating new product object (instance) with user inserted data
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    offer,
    productImages,
    feedbacks,
    ratings,
    category,
    updatedAt,
    createdBy: req.user._id,
  });

  //saving the new category object(new instance) in the mongo database
  product.save((err, product) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (product) {
      res.status(201).json({ product });
    }
  });
};
