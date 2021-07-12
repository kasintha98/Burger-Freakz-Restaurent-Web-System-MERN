//category model (product table) is created using mongoose schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating new schema
const productSchema = new Schema(
  {
    name: {
      //name attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true, //ignore white spaces
    },
    slug: {
      //unique slug attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      unique: true, //unique attribute
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      //description attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true,
    },
    offer: { type: Number },
    productImages: [
      {
        //product images attribute in the user table (single field in table)
        img: { type: String }, //data type
      },
    ],
    feedbacks: [
      {
        //getting the users user id from the User schema as a foreign key
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        feedback: String,
      },
    ],
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    updatedAt: Date,
  },
  { timestamps: true } //automatically stores date created/modified
);

const Product = mongoose.model("Product", productSchema); //Product mean model name. we can use any name like variable name

module.exports = Product;
