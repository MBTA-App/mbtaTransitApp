// StationDetails.js
import "../../styles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { api } from "../../utilities/api";
import Map from "../trainMap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getUserInfo from "../../utilities/decodeJwt";

function StationDetails({ recommendCount, notRecommendedCount }) {
  const [deleteStatuses, setDeleteStatuses] = useState({});

  const { stationId } = useParams(); // Extract stationId from URL params
  const [station, setStation] = useState(null);
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [reviewRatings, setReviewRatings] = useState([]); // New state for reviews
  const [submitStatus, setSubmitStatus] = useState(null); // New state for submit status
  const [userInfo, setUserInfo] = useState(null); // New state for user information
  const [deleteStatus, setDeleteStatus] = useState(null);

  const [recommendationCount, setRecommendationCount] = useState(0);
  const [notRecommendationCount, setNotRecommendationCount] = useState(0);

  const [reviewData, setReviewData] = useState({
    //default values
    recommendation: "",
    description: "",
    user: "",
    stationId: stationId,
  });

  const [ratingData, setRatingData] = useState({
    //default values
    username: "",
    stationId: stationId,
  });

  useEffect(() => {
    // Fetch user info
    const currentUserInfo = getUserInfo();

    setUserInfo(currentUserInfo);

    // Set the initial 'user' field in the review data
    setReviewData((prevData) => ({
      ...prevData,
      user: currentUserInfo ? currentUserInfo.username : "",
    }));

    setRatingData((prevData) => ({
      ...prevData,
      username: currentUserInfo ? currentUserInfo.username : "",
    }));
  }, []);

  const handleReviewChange = (input) => {
    setReviewData({ ...reviewData, [input.name]: input.value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a reviews endpoint for submitting reviews
      const response = await axios.post(
        `http://localhost:8081/userReview/reviews`,
        {
          stationId: stationId, // Add stationId to associate the review with the station
          ...reviewData,
        }
      );

      setReviews([...reviews, response.data]);
      setReviewData({
        recommendation: "",
        description: "",
        user: userInfo ? userInfo.username : "",
        stationId: stationId,
      });

      // Optionally, you can perform any additional actions after a successful submission
      // For example, updating the UI or navigating to a different page
      console.log("Review submitted successfully!");
      setSubmitStatus("Success");
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitStatus("Error");
    }
  };

  const deleteReview = async (e, reviewId) => {
    e.preventDefault();
    try {
      // Assuming you have a reviews endpoint for deleting reviews
      await axios.delete(
        `http://localhost:8081/userReview/deleteReviews/${reviewId}`
      );

      setReviews(reviews.filter((review) => review._id !== reviewId));

      setDeleteStatuses({ ...deleteStatuses, [reviewId]: "Success" });

      // Optionally, you can perform any additional actions after a successful deletion
      // For example, updating the UI or reloading the reviews
      console.log("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      setDeleteStatuses({ ...deleteStatuses, [reviewId]: "Error" });
    }
  };

  // Define the fetchReviewRatings function
  const fetchReviewRatings = async (reviewId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/reviewRating/getRatings/${reviewId}`
      );
      const ratings = response.data;

      let thumbsUpCount = 0;
      let thumbsDownCount = 0;

      ratings.forEach((rating) => {
        if (rating.voteType === 1) {
          thumbsUpCount++;
        } else if (rating.voteType === 0) {
          thumbsDownCount++;
        }
      });

      return { thumbsUpCount, thumbsDownCount };
    } catch (error) {
      console.error("Error fetching review ratings:", error);
      return { thumbsUpCount: 0, thumbsDownCount: 0 }; // Return default values on error
    }
  };

  const handleVote = async (reviewId, voteType, stationId) => {
    try {
      await axios.post(
        `http://localhost:8081/reviewRating/rateReview/${reviewId}`,
        { voteType, stationId, ...ratingData }
      );

      // Fetch updated vote counts after voting
      const { thumbsUpCount, thumbsDownCount } = await fetchReviewRatings(
        reviewId
      );

      // Update the reviews array with the updated counts
      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewId) {
          return {
            ...review,
            thumbsUp: thumbsUpCount,
            thumbsDown: thumbsDownCount,
          };
        }
        return review;
      });

      // Set the state with the updated reviews
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error recording vote:", error);
    }
  };
  useEffect(() => {
    // Fetch initial reviews data when component mounts
    // Example: axios.get('http://localhost:8081/reviews').then(response => setReviews(response.data));
  }, []); // Add any dependencies if needed

  let buttonStyling = {
    background: "#fffff",
    borderStyle: "none",
  };
  useEffect(() => {
    async function fetchStationDetails() {
      try {
        const result = await axios(
          `https://api-v3.mbta.com/stops/${stationId}`
        );
        setStation(result.data.data);
      } catch (error) {
        console.error("Error fetching station details:", error);
      }
    }

    async function fetchReviews() {
      try {
        const reviewsResult = await api.get(
          `/userReview/getReviews/${stationId}`
        );
        const fetchedReviews = reviewsResult.data;

        let recommendCount = 0;
        let notRecommendedCount = 0;

        fetchedReviews.forEach((review) => {
          if (review.recommendation === "Recommended") {
            recommendCount++;
          } else if (review.recommendation === "Not Recommended") {
            notRecommendedCount++;
          }
        });

        setRecommendationCount(recommendCount);
        setNotRecommendationCount(notRecommendedCount);

        console.log(recommendCount);
        console.log(notRecommendedCount);

        // Fetch review ratings for each review
        const updatedReviews = await Promise.all(
          fetchedReviews.map(async (review) => {
            try {
              // Fetch review ratings for the current review
              const response = await axios.get(
                `http://localhost:8081/reviewRating/getRatings/${review._id}`
              );
              const ratings = response.data;

              let thumbsUpCount = 0;
              let thumbsDownCount = 0;

              // Calculate thumbs up and thumbs down counts
              ratings.forEach((rating) => {
                if (rating.voteType === 1) {
                  thumbsUpCount++;
                } else if (rating.voteType === 0) {
                  thumbsDownCount++;
                }
              });

              // Update the review object with thumbs up and thumbs down counts
              return {
                ...review,
                thumbsUp: thumbsUpCount,
                thumbsDown: thumbsDownCount,
              };
            } catch (error) {
              console.error("Error fetching review ratings:", error);
              return review; // Return the original review if there's an error
            }
          })
        );
        setReviews(updatedReviews); // Update the state with reviews containing thumbs up and thumbs down counts
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    async function fetchData() {
      // Fetch reviews and station details concurrently
      await Promise.all([fetchReviews(), fetchStationDetails()]);
      // Fetch review ratings after reviews and station details are fetched
      // await fetchReviewRatingsOnLoad();
    }

    fetchData();
  }, [stationId]);

  if (!station) {
    return (
      <div className="d-flex justify-content-center align-content-center">
        Loading...
      </div>
    );
  }

  return (
    <Container>
      <div>
        <div>
          <h1 className="d-flex justify-content-center align-content-center">
            {station.attributes.name} {"- "}
            {station.attributes.description
              ? station.attributes.description.split("-")[1]?.trim()
              : "Not available"}
          </h1>
          <Card>
            <Map
              latitude={station.attributes.latitude}
              longitude={station.attributes.longitude}
              stationName={station.attributes.platform_name}
            />
          </Card>
          <div>
            <h2
              className="text-center mt-2"
              style={{
                fontSize: "16px",
                color:
                  recommendationCount === 0 && notRecommendationCount === 0
                    ? "orange"
                    : recommendationCount > notRecommendationCount
                    ? "green"
                    : "red",
              }}
            >
              {recommendationCount === 0 && notRecommendationCount === 0
                ? "Users have not reviewed this station yet."
                : `Based on reviews, most users ${
                    recommendationCount > notRecommendationCount
                      ? "recommend this station!"
                      : "do not recommend this station!"
                  }`}
            </h2>
          </div>

          <Container className="justify-content-center align-content-center d-flex">
            <div
              style={{ width: "100%" }}
              className="card border-0 text-center"
            >
              <div className="row justify-content-center align-content-center">
                <div className="col-sm-2">
                  <p>
                    <strong>Latitude:</strong> {station.attributes.latitude}
                  </p>
                </div>
                <div className="col-sm-2">
                  <p>
                    <strong>Longitude:</strong> {station.attributes.longitude}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <Card className="border-0">
            <div className="text-center">
              <div>
                <h1>Want to review this station?</h1>
              </div>
              <Card className="border-0">
                <div class="form-group d-flex flex-column align-items-center mb-4 ">
                  <select
                    class="form-control mb-3 w-75"
                    name="recommendation" // Add the name attribute
                    onChange={(e) => handleReviewChange(e.target)}
                  >
                    <option>Select one</option>
                    <option>Recommended</option>
                    <option>Not Recommended</option>
                  </select>
                  <label for="exampleFormControlInput1" class="col-form-label">
                    Give a brief description of why:
                  </label>
                  <input
                    type="text"
                    class="form-control w-75 py-5 align-top"
                    id="review"
                    name="description" // Add the name attribute
                    value={reviewData.description}
                    onChange={(e) => handleReviewChange(e.target)}
                    placeholder=""
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={submitReview}
                    style={{ buttonStyling }}
                    className="mt-2 col-sm-3 col-lg-2 col-md-2"
                  >
                    Submit
                  </Button>
                </div>
              </Card>
              {submitStatus === "Success" && (
                <div className="text-success">
                  Review submitted successfully!
                </div>
              )}
              {submitStatus === "Error" && (
                <div className="text-danger">
                  Error submitting review. Please try again.
                </div>
              )}
            </div>
          </Card>

          <Card className="mt-4 border-0">
            <div className="text-center">
              <div>
                <h1>View Reviews</h1>
                <Card className="border">
                  {reviews
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date in descending order
                    .map((review) => (
                      <div className="mt-2" key={review._id}>
                        {/* Display each review here */}
                        {review && review.user && (
                          <>
                            <p>By: {review.user}</p>
                            <p>Recommendation: {review.recommendation}</p>
                            <p>Description: {review.description}</p>
                            <p>
                              {/* Posted On:{" "} */}
                              {new Date(review.date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              })}
                            </p>
                          </>
                        )}
                        {userInfo && userInfo.username === review.user && (
                          <Button
                            variant="danger"
                            onClick={(e) => deleteReview(e, review._id)}
                          >
                            Delete
                          </Button>
                        )}
                        {deleteStatuses[review._id] === "Success" && (
                          <div className="text-success">
                            Review deleted successfully!
                          </div>
                        )}
                        {deleteStatuses[review._id] === "Error" && (
                          <div className="text-danger">
                            Error deleting review. Please try again.
                          </div>
                        )}

                        <div className="mt-2 " key={review._id}>
                          {" "}
                          <button
                            className="border-0 bg-gray  shake"
                            onClick={() => handleVote(review._id, 1)}
                          >
                            {review.thumbsUp}{" "}
                            <span role="img" aria-label="thumbs up">
                              👍
                            </span>
                          </button>
                          <button
                            className="border-0 bg-gray  shake"
                            onClick={() => handleVote(review._id, 0)}
                          >
                            👎{" "}
                            <span role="img" aria-label="thumbs down">
                              {review.thumbsDown}
                            </span>
                          </button>
                        </div>

                        <hr />
                      </div>
                    ))}
                </Card>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    </Container>
  );
}

export default StationDetails;
