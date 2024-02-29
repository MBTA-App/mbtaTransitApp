const mongoose = require('mongoose')

const userFavoritesSchema = new mongoose.Schema(
  {
    stationId: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { collection: 'userFavorites' }
)

module.exports = mongoose.model('UserFavorites', userFavoritesSchema)