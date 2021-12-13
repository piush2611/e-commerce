const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: [isEmail, "Invalid email"],
      index: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please enter valid password"],
      minlength: [6, "Password must be 6 charcters long"],
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
