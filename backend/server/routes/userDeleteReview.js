// routes/userGetReviews.js
const express = require('express')
const router = express.Router()
const Review = require('../models/userReview')

router.delete('/deleteReviews/id', async (req, res) => {
  try {
    const { id } = req.params

    // Delete reviews based on the provided stationId
    await Review.deleteMany({ id })

    // Respond with a success message
    res.json({ message: 'Reviews deleted successfully' })
  } catch (error) {
    console.error('Error deleting reviews:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
