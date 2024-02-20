const mongoose = require('mongoose')

// userReview schema/model
const userReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'userReviews' } // Choose an appropriate collection name
)

module.exports = mongoose.model('UserReview', userReviewSchema)
