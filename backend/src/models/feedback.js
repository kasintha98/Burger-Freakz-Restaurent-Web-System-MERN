const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating a new schema
const feedbackSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    feedback: {
      type: String,
    },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
