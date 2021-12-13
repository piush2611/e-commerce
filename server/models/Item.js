const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    itemId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      // required: true,
    },
    itemName: {
      type: String,
      required: true,
      index: true,
    },
    itemCategory: {
      type: String,
      required: true,
    },
    itemDescription: String,
    itemPrice: {
      type: Number,
      required: true,
    },
    itemImgUrl: String,
  },
  { timestamps: true }
);

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
