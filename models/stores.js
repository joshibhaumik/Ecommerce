const mongoose = require("mongoose");
const Items = require("./Items").schema;

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
      type: mongoose.Schema.Types.ObjectId,
      reF: "User",
      required:true
    },
    items: [
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

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
