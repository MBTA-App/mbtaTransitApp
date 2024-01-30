const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async () => {
  const databaseParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    // Check if process.env.DB_URL is defined before attempting to connect
    if (!process.env.DB_URL) {
      throw new Error('MongoDB connection URI is not defined.')
    }

    await mongoose.connect(process.env.DB_URL, databaseParams)
    console.log('The backend has connected to the MongoDB database.')
  } catch (error) {
    console.error(`Could not connect to MongoDB: ${error.message}`)
  }
}
