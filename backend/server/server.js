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
const userDeleteReview = require("./route/userDeleteReview");
const userGetFavoriteStation = require("./route/userGetFavoriteStation");

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
app.use("/userReview", userGetReviews);
app.use("/userReview", userReviews);
app.use("/userReview", userDeleteReview);
app.use("/favorite", userGetFavoriteStation);

app.listen(SERVER_PORT, (req, res) => {
  console.log(
    `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
  );
});
