const express = require("express");
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/userLogin");
const getAllUsersRoute = require("./routes/userGetAllUsers");
const registerRoute = require("./routes/userSignUp");
const getUserByIdRoute = require("./routes/userGetUserById");
const dbConnection = require("./config/db.config");
const editUser = require("./routes/userEditUser");
const deleteUser = require("./routes/userDeleteAll");
const userGetReviews = require("./routes/userGetReviews");
const userReviews = require("./routes/userReviews");
const userDeleteReview = require("./routes/userDeleteReview");
const favorites = require("./routes/userFavorite");
const deleteFavorite = require("./routes/userDeleteFavorite");
const getFavorites = require("./routes/userGetFavorite");
//const reviewRating = require('./routes/userReviewRating')

// const userDeleteReview = require('./route/userDeleteReview')
// const userGetFavoriteStation = require('./route/userGetFavoriteStation')

require("dotenv").config();
const SERVER_PORT = 8081;

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/user", loginRoute);
app.use("/user", registerRoute);
app.use("/user", getAllUsersRoute);
app.use("/user", getUserByIdRoute);
app.use("/user", editUser);
app.use("/user", deleteUser);
app.use("/userFav", getFavorites);
app.use("/userFav", favorites);
app.use("/userFav", deleteFavorite);
app.use("/userReview", userGetReviews);
app.use("/userReview", userReviews);
app.use("/userReview", userDeleteReview);
// app.use('/reviewRating', reviewRating)
// app.use("/userFavorite", userFavorite)

app.listen(SERVER_PORT, (req, res) => {
  console.log(
    `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
  );
});
