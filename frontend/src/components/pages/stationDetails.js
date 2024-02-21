// StationDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../trainMap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import getUserInfo from "../../utilities/decodeJwt";

function StationDetails() {
  const { stationId } = useParams(); // Extract stationId from URL params
  const [station, setStation] = useState(null);
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [submitStatus, setSubmitStatus] = useState(null); // New state for submit status

  const [reviewData, setReviewData] = useState({
    //default values
    rating: 0,
    recommendation: "",
    description: "",
    user: "",
    stationId: stationId,
  });

  useEffect(() => {
    // Fetch user info
    const userInfo = getUserInfo();

    // Set the initial 'user' field in the review data
    setReviewData((prevData) => ({
      ...prevData,
      user: userInfo ? userInfo.username : "",
    }));
  }, []);

  const handleReviewChange = (input) => {
    setReviewData({ ...reviewData, [input.name]: input.value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a reviews endpoint for submitting reviews
      await axios.post(`http://localhost:8081/userReview/reviews`, {
        stationId: stationId, // Add stationId to associate the review with the station
        ...reviewData,
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
        // Assuming you have an endpoint for fetching reviews
        const reviewsResult = await axios.get(
          `http://localhost:8081/userReview/getReviews/${stationId}`
        );
        setReviews(reviewsResult.data); // Assuming reviews data is an array
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
    fetchStationDetails();
  }, [stationId]);

  const [basic] = useState([
    {
      tooltip: "Very Bad",
    },
    {
      tooltip: "Poor",
    },
    {
      tooltip: "Ok",
      choosed: true,
    },
    {
      tooltip: "Good",
    },
    {
      tooltip: "Excellent",
    },
  ]);

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
                    className="mt-2 col-1"
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
                  {reviews.map((review) => (
                    <div className="mt-2" key={review._id}>
                      {/* Display each review here */}
                      <p>User: {review.user}</p>
                      <p>Rating: {review.rating}</p>
                      <p>Recommendation: {review.recommendation}</p>
                      <p>Description: {review.description}</p>
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
