const mongoose = require("mongoose");

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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
