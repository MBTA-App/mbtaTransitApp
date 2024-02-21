// routes/userGetReviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/userReview");

// Get reviews for a specific station
router.get("/getReviews/:stationId", async (req, res) => {
  try {
    const { stationId } = req.params;

    // Fetch reviews based on the provided stationId
    const reviews = await Review.find({ stationId });

    // Respond with the fetched reviews
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
