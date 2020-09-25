const mongoose = require("mongoose");

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
      required: true,
      enum: ["vegetables","groceries","electronics","stationery","fruits"]
    },
    image: {
      type: String,
      required: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required:true
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      }
    ]
  },
  {
    timestamps: true
  }
);

const Items = mongoose.model("Item", items);

module.exports = Items;
