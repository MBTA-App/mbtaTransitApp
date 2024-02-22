// routes/userGetReviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/userReview");

// Get reviews for a specific station
router.delete("/deleteReviews/:stationId", async (req, res) => {
  try {
    const { stationId } = req.params;

    // Delete reviews based on the provided stationId
    await Review.deleteMany({ stationId });

    // Respond with a success message
    res.json({ message: "Reviews deleted successfully" });
  } catch (error) {
    console.error("Error deleting reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
