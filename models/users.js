const mongoose = require("mongoose");
const Items = require("./Items");

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
    isAdmin: {
      type: Boolean,
      default: false
    },
    cart: [Items],
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
