const express = require('express')
const router = express.Router()
const ReviewRating = require('../models/userReviewRating')

// Route to add or update a thumbs-up or thumbs-down for a review
router.post('/rateReview/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId
    const { voteType, username } = req.body

    // Find or create a rating entry based on the reviewId
    let rating = await ReviewRating.findOne({ reviewId, username })

    if (!rating) {
      rating = new ReviewRating({ reviewId, username })
    }

    // Update voteType (1 for yes, 0 for no)
    rating.voteType = voteType

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
    const rating = await ReviewRating.find({ reviewId })

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found for the given reviewId' })
    }

    res.status(200).json(rating)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/getAllRatings', async (req, res) => {
  try {
    const allRatings = await ReviewRating.find()
    res.status(200).json(allRatings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route to delete a specific review rating
router.delete('/deleteRating/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId

    // Find and delete the rating entry
    const deletedRating = await ReviewRating.findOneAndDelete({ reviewId })

    if (!deletedRating) {
      return res.status(404).json({ error: 'Rating not found for the given reviewId' })
    }

    res.status(200).json({ message: 'Rating deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
