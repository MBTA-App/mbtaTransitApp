const express = require('express')
const router = express.Router()
const Favorite = require('../models/userFavorites')

// Route to add a favorite station to a user
router.post('/userFavorite', async (req, res) => {
  try {
    const newFavorite = new Favorite(req.body)
    const savedFavorite = await newFavorite.save()
    res.status(201).json(savedFavorite)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Add more routes as needed

module.exports = router