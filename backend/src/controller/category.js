//controller for creating new categories
const Category = require("../models/category");
const slugify = require("slugify");

exports.addCategory = (req, res) => {
  //destructuring the request body and getting all the elements separately for easy use
  const { name, description } = req.body;

  //saving all category images uploaded in an array
  let categoryImages = [];

  //if categoryImages exists then mapping them to a array of objects as needed in the category schema
  if (req.files.length > 0) {
    categoryImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  //creating new category object (instance) with user inserted data
  const categoryObj = {
    name,
    slug: slugify(name),
    description,
    categoryImages,
    createdBy: req.user._id,
  };

  //saving the new category object(new instance) in the mongo database
  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

/* function createCategories(categories) {
  //saving all the categories in an array and returning them for easy get
  const categoryList = [];

  for (let cat of categories) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      categoryImage: cat.categoryImage,
    });
  }

  return categoryList;
} */

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (categories) {
      //using createCategories function to store all the categories in the categoryList array
      /* const categoryList = createCategories(categories); */

      return res.status(200).json({ categories /* categoryList */ });
    }
  });
};
