// routes/userGetReviews.js
// submission
const express = require("express");
const router = express.Router();
const Review = require("../models/userReview");

// Get all reviews
router.get("/getReviews", async (req, res) => {
  try {
    // Fetch all reviews
    const reviews = await Review.find();

    // Respond with the fetched reviews
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
