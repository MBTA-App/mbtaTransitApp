const express = require("express");
const router = express.Router();
const UserFavorites = require("../models/userFavorites");

// Route to delete a favorite station by user ID and station ID
router.delete("/deleteFavorites/:userId/:stationId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const stationId = req.params.stationId;

    // Find and remove the matching favorite station
    const result = await UserFavorites.findOneAndRemove({
      user: userId,
      stationId: stationId,
    });

    if (!result) {
      return res.status(404).json({
        error:
          "Favorite station not found for the given user ID and station ID",
      });
    }

    res.json({ message: "Favorite Station deleted successfully" });

    // res.status(204).json({ message: 'Favorite station successfully deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add more routes as needed

module.exports = router;
