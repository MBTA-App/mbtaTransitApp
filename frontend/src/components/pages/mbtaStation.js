import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";

import StationDetails from "./stationDetails";

function Stations() {
  const [stations, setStations] = useState([]);
  const [recommendCount, setRecommendCount] = useState(0);
  const [notRecommendedCount, setNotRecommendedCount] = useState(0);
  const [userFavorites, setUserFavorites] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

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
  console.log(userId);

  useEffect(() => {
    async function fetchUserFavorites() {
      const getFavoritesUrl = `http://localhost:8081/userFav/getFavorites/${userId}`;

      // Check if userId is defined
      if (userId) {
        try {
          const response = await axios.get(getFavoritesUrl);
          setUserFavorites(response.data);
        } catch (error) {
          console.error("Error fetching user favorites:", error);
        }
      }
    }
    fetchUserFavorites();
  }, [getUserInfo()?.id]); // Add getUserInfo()?.id to dependency array

  const filteredStations = filterActive
    ? stations.filter((station) =>
        userFavorites.map((item) => item.Id).includes(station.id)
      )
    : stations;

  // Function to toggle the filter
  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

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
      <div className="d-flex justify-content-center align-items-center">
        <button className="text-center mb-4" onClick={toggleFilter}>
          {filterActive ? "Show All Stations" : "Filter by Favorites"}
        </button>
      </div>

      <Row xs={1} md={2} lg={3} xl={3} className="g-4">
        {filterActive
          ? filteredStations.map((station) => (
              <Col key={station.id}>
                <Link
                  to={`/stations/${station.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* Content of each link */}
                </Link>
              </Col>
            ))
          : stations.map((station) => (
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
                      backgroundColor: "#D3D3D3",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#A9A9A9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#D3D3D3")
                    }
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
