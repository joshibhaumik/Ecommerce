const mongoose = require("mongoose");
const Comments = require("./Comments");

const items = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: -1
    },
    category: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store"
    },
    comments: [Comments]
  },
  {
    timestamps: true
  }
);

const Items = mongoose.model("Item", items);

module.exports = Items;
