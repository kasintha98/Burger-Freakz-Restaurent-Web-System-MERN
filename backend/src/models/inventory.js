//inventory model (inventory table) is created using mongoose schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating new schema
const inventorySchema = new Schema(
  {
    name: {
      //name attribute in the inventory table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true, //ignore white spaces
    },
    description: {
      //description attribute in the inventory table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true,
    },
    qty: {
      //description attribute in the inventory table (single field in table)
      type: Number, //data type
      required: true, //not null
    },
    addedBy: {
      //getting the inventorys inventory id from the inventory schema as a foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } //automatically stores date created/modified
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
