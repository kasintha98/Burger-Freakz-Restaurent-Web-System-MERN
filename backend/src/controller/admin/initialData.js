//controller for initialData in admin-app

const Category = require("../../models/category");
const Product = require("../../models/product");

exports.initialData = async (req, res) => {
  //fetching all the categories
  const categories = await Category.find({}).exec();
  const products = await Product.find({}).exec();

  res.status(200).json({ categories, products });
};
