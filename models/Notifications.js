const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    userTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    },
    itemName: {
      type: String,
      required: true
    },
    userFromDisplayName: {
      type: String,
      required: true
    },
    userFromEmail: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required:true
    },
    quantity: {
      type: String,
      required: true
    },
    message: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
