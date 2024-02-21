const mongoose = require("mongoose");

const userReviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User", // Reference to the User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    recommendation: {
      type: String,
      enum: ["Recommended", "Not Recommended"], // Add other possible values
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
