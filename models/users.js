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

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store"
    },
    notifications: [notificationSchema],
    cart: [cartSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
