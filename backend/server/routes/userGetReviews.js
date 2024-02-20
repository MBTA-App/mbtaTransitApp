// routes/userGetReviews.js
const express = require('express')
const router = express.Router()
const Review = require('../models/userReview')

// Get all reviews
router.get('/getReviews', async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (error) {
    console.error('Error retrieving reviews:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
