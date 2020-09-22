const mongoose = require("mongoose");
const Items = require("./Items").schema;

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true
    },
    email: {
      type:String,
      required:true
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
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store"
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
      }
    ],
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
