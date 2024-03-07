//submission
const mongoose = require("mongoose");

const userReviewSchema = new mongoose.Schema(
  {
    stationId: {
      type: Number,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: "User", // Reference to the User model
      required: true,
    },
    recommendation: {
      type: String,
      enum: ["Recommended", "Not Recommended"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "userReviews" }
);

module.exports = mongoose.model("UserReview", userReviewSchema);
