//user model (user table) is created using mongoose schema
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

//creating new schema
const userSchema = new Schema(
  {
    firstName: {
      //firstName attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true, //ignore white spaces
      min: 3, //minimum length is 3 characters
      max: 20, //maximum length is 20 characters
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    nic: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hash_password: {
      type: String,
      required: true,
      min: 8,
    },

    role: {
      type: String,
      enum: ["user", "admin", "manager", "chef", "deliveryrider"],
      default: "user",
      lowercase: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 10,
    },

    address: {
      type: String,
      required: true,
      lowercase: true,
    },

    profilePicture: {
      type: String,
    },
  },
  { timestamps: true } //automatically stores date created/modified
);

/* userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
}); */

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

const User = mongoose.model("User", userSchema); //User mean model name. we can use any name like variable name

module.exports = User;
