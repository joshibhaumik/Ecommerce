const mongoose = require("mongoose");
const Items = require("./Items");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    user: {
      type: mongoose.mongo.Schema.Types.ObjectId,
      reF: "User"
    },
    items: [Items]
  },
  {
    timestamps: true
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
