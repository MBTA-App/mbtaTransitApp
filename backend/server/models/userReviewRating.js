const mongoose = require('mongoose')

// User schema/model

const thumbsSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      label: 'reviewid',
    },
    username: {
      type: String,
      ref: 'User', // Reference to the User model
      label: 'username',
      required: true,
    },
    voteType: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'reviewRating' }
)

module.exports = mongoose.model('ReviewRating', thumbsSchema)
