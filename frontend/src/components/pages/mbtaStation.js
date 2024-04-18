import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
import { FaStar } from "react-icons/fa";
import "../../styles.css";
import StationDetails from "./stationDetails";

function Stations() {
  const [stations, setStations] = useState([]);
  const [recommendCount, setRecommendCount] = useState(0);
  const [notRecommendedCount, setNotRecommendedCount] = useState(0);
  const [userFavorites, setUserFavorites] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [filteredStations, setFilteredStations] = useState([]);
  const [lineFilter, setLineFilter] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://api-v3.mbta.com/stops?filter[route_type]=1"
      );
      setStations(result.data.data);
      // Placeholder values for recommendCount and notRecommendedCount
      setRecommendCount(10);
      setNotRecommendedCount(5);
    }
    fetchData();
  }, []);

  const userId = getUserInfo()?.id;

  useEffect(() => {
    async function fetchUserFavorites() {
      const getFavoritesUrl = `http://localhost:8081/userFav/getFavorites/${userId}`;

      // Check if userId is defined
      if (userId) {
        try {
          const response = await axios.get(getFavoritesUrl);
          setUserFavorites(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user favorites:", error);
        }
      }
    }
    fetchUserFavorites();
  }, [userId]); // Add userId and stations to dependency array

  useEffect(() => {
    // Extract stationIds from userFavorites
    const stationIds = userFavorites.map((item) => String(item.stationId));

    // Filter stations based on stationIds
    const filteredStations = stations.filter((station) =>
      stationIds.includes(station.id)
    );
    console.log(filteredStations);

    setFilteredStations(filteredStations);
    console.log("Filtered Stations:", filteredStations);
  }, [userFavorites, stations]);

  // Function to toggle the filter
  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  const handleLineFilter = (line) => {
    console.log(line);
    setLineFilter(line);
  };

  const filteredStationsToShow = filterActive
    ? filteredStations
      ? filteredStations.filter((station) => {
          // Extract the middle part of the description
          const middleDescription = station.attributes.description
            .split("-")[1]
            ?.trim();
          // Check if the middle description includes the selected line filter
          return lineFilter ? middleDescription.includes(lineFilter) : true;
        })
      : []
    : stations.filter((station) => {
        // Extract the middle part of the description
        const middleDescription = station.attributes.description
          .split("-")[1]
          ?.trim();
        // Check if the middle description includes the selected line filter
        return lineFilter ? middleDescription.includes(lineFilter) : true;
      });
  const renderErrorMessage = () => {
    if (filteredStationsToShow.length === 0) {
      return <div className="text-center fs-4 fw-bold">No lines to show.</div>;
    }
  };

  useEffect(() => {
    console.log("User Favorites:", userFavorites);
  }, [userFavorites]);

  useEffect(() => {
    console.log("Stations:", stations);
  }, [stations]);

  return (
    <Container style={{ padding: "4px", marginLeft: "12%" }}>
      <Card className="border-0 bg-light mb-4 ">
        <header className="jumbotron text-center">
          <div className="container">
            <h1 className="display-4">MBTA Stations</h1>
            <p className="lead">
              Explore the different stations and give them a review!
            </p>
          </div>
        </header>
      </Card>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <button
          className={`text-center btn me-2  ${
            filterActive ? "bg-info" : "bg-info"
          }`}
          onClick={toggleFilter}
          style={{
            transition: "background-color 0.3s",
            cursor: "pointer",
          }}
        >
          {filterActive ? "Show All Stations" : "Favorites"}
        </button>
        {!filterActive && (
          <>
            <button
              className="btn btn-success me-2"
              onClick={() => handleLineFilter("")}
            >
              All
            </button>
            <button
              className="btn btn-success me-2"
              onClick={() => handleLineFilter("Green")}
            >
              Green Line
            </button>
            <button
              className="btn btn-danger me-2"
              onClick={() => handleLineFilter("Red")}
            >
              Red Line
            </button>
            <button
              className="btn btn-primary me-2"
              onClick={() => handleLineFilter("Blue")}
            >
              Blue Line
            </button>
            <button
              className="btn btn-warning me-2"
              onClick={() => handleLineFilter("Orange")}
            >
              Orange Line
            </button>
          </>
        )}
      </div>
      {renderErrorMessage()}

      <Row xs={1} md={2} lg={3} xl={3} className="g-4">
        {filterActive
          ? filteredStations.map((station) => (
              <Col key={station.id}>
                <Link
                  to={`/stations/${station.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    body
                    outline
                    color="info"
                    className="mb-3 mx-auto"
                    style={{
                      maxWidth: "100%",
                      backgroundColor: "lightgreen",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "green")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "lightgreen")
                    }
                  >
                    <FaStar
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        color: "yellow",
                        zIndex: 1, // To place the star above the card content
                      }}
                    />
                    <Card.Body className="text-center ">
                      <Card.Title>
                        <strong>{station.attributes.name}</strong>
                      </Card.Title>
                      <Card className="mx-4 text-start border-0 bg-transparent">
                        <Card.Text>
                          <strong>Line:</strong>{" "}
                          {station.attributes.description
                            ? station.attributes.description
                                .split("-")[1]
                                ?.trim()
                            : "Not available"}
                        </Card.Text>
                        <Card.Text>
                          <strong>Municipality:</strong>{" "}
                          {station.attributes.municipality}
                        </Card.Text>
                        <Card.Text>
                          <strong>Accessibility:</strong>{" "}
                          {station.attributes.wheelchair_boarding === 1
                            ? "Accessible"
                            : "Inaccessible"}
                        </Card.Text>
                        {/* <Card.Text>
                      <StationDetails
                        recommendCount={recommendCount}
                        notRecommendedCount={notRecommendedCount}
                      />
                    </Card.Text> */}
                      </Card>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          : filteredStationsToShow.map((station) => (
              <Col key={station.id}>
                <Link
                  to={`/stations/${station.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    body
                    outline
                    className={`mb-3 mx-auto ${
                      filterActive && lineFilter === "" ? "filtered-card" : ""
                    } ${
                      lineFilter
                        ? lineFilter.toLowerCase() + "-card"
                        : "default-card"
                    }`}
                    style={{
                      maxWidth: "100%",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <Card.Body className="text-center ">
                      <Card.Title>
                        <strong>{station.attributes.name}</strong>
                      </Card.Title>
                      <Card className="mx-4 text-start border-0 bg-transparent">
                        <Card.Text>
                          <strong>Line:</strong>{" "}
                          {station.attributes.description
                            ? station.attributes.description
                                .split("-")[1]
                                ?.trim()
                            : "Not available"}
                        </Card.Text>
                        <Card.Text>
                          <strong>Municipality:</strong>{" "}
                          {station.attributes.municipality}
                        </Card.Text>
                        <Card.Text>
                          <strong>Accessibility:</strong>{" "}
                          {station.attributes.wheelchair_boarding === 1
                            ? "Accessible"
                            : "Inaccessible"}
                        </Card.Text>
                        {/* <Card.Text>
                      <StationDetails
                        recommendCount={recommendCount}
                        notRecommendedCount={notRecommendedCount}
                      />
                    </Card.Text> */}
                      </Card>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
      </Row>
      {/* Render the StationDetails component and pass recommendCount and notRecommendedCount as props */}
    </Container>
  );
}

export default Stations;
