//controller for initialData in admin-app

const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");

exports.initialData = async (req, res) => {
  //fetching all the categories
  const categories = await Category.find({})
    .populate({ path: "createdBy", select: "_id firstName lastName" })
    .exec();
  const products = await Product.find({})
    .populate({ path: "category", select: "_id name" })
    .populate({ path: "createdBy", select: "_id firstName lastName" })
    .exec();

  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();

  res.status(200).json({ categories, products, orders });
};
