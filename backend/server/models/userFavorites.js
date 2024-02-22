const mongoose = require("mongoose");

//user schema/model
const userFavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User", // Reference to the User model
      required: true,
    },
    stationId: {
      type: Number, // or whatever type your stationId is
      required: true,
    },
  },
  { collection: "userFavorites" }
);

module.exports = mongoose.model("users", userFavoriteSchema);
