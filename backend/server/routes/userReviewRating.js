const express = require('express')
const router = express.Router()
const ReviewRating = require('../models/userReviewRating')

// Route to add or update a thumbs-up or thumbs-down for a review
router.post('/rateReview/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId
    const { thumbsUp, thumbsDown } = req.body

    // Find or create a rating entry based on the reviewId
    let rating = await ReviewRating.findOne({ reviewId })

    if (!rating) {
      rating = new ReviewRating({ reviewId })
    }

    // Update thumbs-up and thumbs-down counts
    rating.thumbsUp = thumbsUp || rating.thumbsUp
    rating.thumbsDown = thumbsDown || rating.thumbsDown

    const savedRating = await rating.save()

    res.status(201).json(savedRating)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route to get ratings for a specific reviewId
router.get('/getRatings/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId

    // Find the rating entry based on the reviewId
    const rating = await ReviewRating.findOne({ reviewId })

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found for the given reviewId' })
    }

    res.status(200).json(rating)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Add more routes as needed

module.exports = router