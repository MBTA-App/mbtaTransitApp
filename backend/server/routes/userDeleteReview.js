// routes/userGetReviews.js
//submission
const express = require("express");
const router = express.Router();
const Review = require("../models/userReview");

router.delete("/deleteReviews/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the review based on the provided _id
    await Review.deleteOne({ _id: id });

    // Respond with a success message
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
