const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating new schema
const purchaseSchema = new Schema(
  {
    title: {
      //title attribute in the purchase table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true, //ignore white spaces
    },
    description: {
      //description attribute in the purchase table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true,
    },
    qty: {
      //qty attribute in the purchase table (single field in table)
      type: Number, //data type
      required: true, //not null
    },
    unitPrice: {
      //unitPriceattribute in the purchase table (single field in table)
      type: Number, //data type
      required: true, //not null
    },
    addedBy: {
      //getting the purchases purchase id from the purchase schema as a foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } //automatically stores date created/modified
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
