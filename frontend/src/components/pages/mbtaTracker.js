import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import LeafletMap from "./map"; // Replace with the actual path to your LeafletMap component

const Trackerpage = () => {
  const [routeTypeFilter, setRouteTypeFilter] = useState(null);

  const handleFilterClick = (routeType) => {
    setRouteTypeFilter(routeType);
    console.log("Route Type: " + routeType);
  };

  console.log("Current Route Type Filter: ", routeTypeFilter); // Log the current routeTypeFilter

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px",
    margin: "5px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
    cursor: "pointer",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    boxShadow: "inset 0 2px 2px rgba(0, 0, 0, 1)",
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        style={{ width: "90%", height: "90%" }}
        className="text-center bg-white shadow-xl rounded border-0"
      >
        <Card.Body className="d-flex flex-column align-items-center justify-content-center text-light">
          <Card.Title className="display-4 text-black">Live Tracker</Card.Title>
          <div className="mt-4 mb-4">
            <button
              style={routeTypeFilter === null ? activeButtonStyle : buttonStyle}
              //set to null to show all route types
              onClick={() => handleFilterClick(null)}
            >
              All
            </button>
            <button
              style={routeTypeFilter === 0 ? activeButtonStyle : buttonStyle}
              onClick={() => handleFilterClick(0)}
            >
              Tram
            </button>
            <button
              style={routeTypeFilter === 1 ? activeButtonStyle : buttonStyle}
              onClick={() => handleFilterClick(1)}
            >
              Subway
            </button>
            <button
              style={routeTypeFilter === 2 ? activeButtonStyle : buttonStyle}
              onClick={() => handleFilterClick(2)}
            >
              Rail
            </button>
            <button
              style={routeTypeFilter === 3 ? activeButtonStyle : buttonStyle}
              onClick={() => handleFilterClick(3)}
            >
              Bus
            </button>
            <button
              style={routeTypeFilter === 4 ? activeButtonStyle : buttonStyle}
              onClick={() => handleFilterClick(4)}
            >
              Ferry
            </button>
            {/* Add more buttons for other route types if needed */}
          </div>

          <LeafletMap routeTypeFilter={routeTypeFilter} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Trackerpage;
