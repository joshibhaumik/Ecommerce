const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
  availableQuantities: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: -1
  },
  image: {
    type: String,
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }
}, {
    timestamps: true
});

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      unique: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store"
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
      }
    ],
    cart: [cartSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
