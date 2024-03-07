// routes/userFavorites.js
const express = require("express");
const router = express.Router();
const Favorite = require("../models/userFavorites");

// Get user favorites
router.get("/getFavorites/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await Favorite.find({ user: userId });

    if (favorites.length === 0) {
      return res
        .status(404)
        .json({ error: "Favorites not found for the given username" });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getFavorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();

    if (favorites.length === 0) {
      return res.status(404).json({ error: "No favorites found" });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
