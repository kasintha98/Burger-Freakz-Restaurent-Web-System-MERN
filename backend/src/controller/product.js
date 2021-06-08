const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");

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

//getting the products by slug(when entering slug as url parameter)
exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({ err });
      }

      if (category) {
        Product.find({ category: category._id }).exec((err, products) => {
          if (err) {
            return res.status(400).json({ err });
          }

          if (products.length > 0) {
            res.status(200).json({ products });
          }
        });
      }
    });
};

//getting the specific product by slug(when entering slug as url parameter)
exports.getSpecificProductBySlug = (req, res) => {
  const { slug } = req.params;
  Product.findOne({ slug: slug }).exec((err, product) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (product) {
      return res.status(200).json({ product });
    }

    /*   if (product) {
        Product.find({ product: product._id }).exec((err, products) => {
          if (err) {
            return res.status(400).json({ err });
          }

          if (products.length > 0) {
            res.status(200).json({ products });
          }
        });
      } */
  });
};

exports.getProducts = (req, res) => {
  Product.find({})
    .populate({ path: "category", select: "_id name" })
    .populate({ path: "createdBy", select: "_id firstName lastName" })
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (products) {
        return res.status(200).json({ products });
      }
    });
};

exports.updateProduct = async (req, res) => {
  //const { _id, name,price,quantity, description,offer, productImages } = req.body;

  /* const product = {  _id, name,price,quantity, description,offer, productImages  };

  const updatedProduct = await Product.findOneAndUpdate({ _id }, product, {
    new: true,
  });

  return res.status(201).json({ updatedProduct}); */

  //saving all Productimages uploaded in an array
  let productImages = [];

  //if productImages exists then mapping them to a array of objects as needed in the product schema
  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  try {
    await Product.findById(req.body._id).then((product) => {
      product._id = req.body._id;
      product.name = req.body.name;
      product.description = req.body.description;
      product.offer = req.body.offer;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.category = req.body.category;

      if (productImages.length > 0) {
        product.productImages = productImages;
      }

      product
        .save()
        .then(() =>
          res.status(201).json({ msg: "You've Updated the product!" })
        )
        .catch((err) => res.status(400).json({ error: err.message }));
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
      .then(() =>
        res.status(200).json({ msg: "Product Deleted Successfully!" })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
