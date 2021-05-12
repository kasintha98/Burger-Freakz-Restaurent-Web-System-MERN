//category model (category table) is created using mongoose schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating new schema
const categorySchema = new Schema(
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
    description: {
      //description attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true,
    },
    categoryImages: [
      //category images attribute in the user table (single field in table)
      {
        img: { type: String }, //data type
      },
    ],
    createdBy: {
      //getting the users user id from the User schema as a foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } //automatically stores date created/modified
);

const Category = mongoose.model("Category", categorySchema); //User mean model name. we can use any name like variable name

module.exports = Category;
