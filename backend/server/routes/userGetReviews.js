// routes/userGetReviews.js
// submission
const express = require("express");
const router = express.Router();
const Review = require("../models/userReview");

// Get reviews for a specific station by stationId
router.get("/getReviews/:stationId", async (req, res) => {
  try {
    const { stationId } = req.params;

    const reviews = await Review.find({ stationId });

    if (reviews.length === 0) {
      // If no reviews found, return error
      return res
        .status(404)
        .json({ error: "Station ID does not exist or No reviews to display" });
    }
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
