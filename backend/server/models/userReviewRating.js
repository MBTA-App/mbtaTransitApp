const mongoose = require("mongoose");

// User schema/model

const thumbsSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      label: 'reviewid',
    },
    thumbsUp: {
      type: Number,
      default: 0,
    },
    thumbsDown: {
      type: Number,
      default: 0,
    },
  },
  { collection: "reviewRating" }
);

module.exports = mongoose.model("ReviewRating", thumbsSchema);
