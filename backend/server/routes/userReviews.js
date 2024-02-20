// routes/userReviews.js
const express = require('express')
const router = express.Router()
const Review = require('../models/userReview')

// Create a review
router.post('/reviews', async (req, res) => {
  try {
    const newReview = new Review(req.body)
    const savedReview = await newReview.save()
    res.status(201).json(savedReview)
  } catch (error) {
    console.error('Error saving review:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
