const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    displayName: {
      type:String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required:true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min:1,
      max:5
    }
  },
  { timestamps: true }
);

const comments = mongoose.model("Comment", commentSchema);

module.exports = comments;
