import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [serviceType, setServiceType] = useState(""); // State to store service type filter

  useEffect(() => {
    async function fetchData() {
      try {
        let url =
          "https://api-v3.mbta.com/alerts?sort=-updated_at&filter[activity]=BOARD,EXIT,RIDE";

        // Append service type filter to the URL if a service type is selected
        if (serviceType) {
          url += `&filter[route_type]=${serviceType}`;
        }

        const result = await axios.get(url);
        setAlerts(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [serviceType]); // Fetch data whenever serviceType changes

  const handleFilterChange = (event) => {
    setServiceType(event.target.value);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded mt-2" style={{ backgroundColor: "#165c96" }}>
            <div className="text-center text-white p-3">
              <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                MBTA Alerts
              </h1>
            </div>
            {/* Filter input */}
            <div className="d-flex justify-content-center align-items-center p-2">
              <select
                className="form-select"
                style={{ width: "50%" }}
                value={serviceType}
                onChange={handleFilterChange}
              >
                <option value="">All Service Types</option>
                <option value="0">Tram, Streetcar, Light rail</option>
                <option value="1">Subway, Metro</option>
                <option value="2">Rail</option>
                <option value="3">Bus</option>
                <option value="4">Ferry</option>
              </select>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          {/* Display alerts */}
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="mb-4"
              style={{
                backgroundColor: "#FFEB99",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 style={{ margin: "0", fontStyle: "italic" }}>Alert</h2>
                <small>
                  {new Date(alert.attributes.updated_at).toLocaleString()}
                </small>
              </div>
              <p style={{ margin: "0", marginBottom: "10px" }}>
                <em>{alert.attributes.header}</em>
              </p>
              <p style={{ margin: "0" }}>
                <em>{alert.attributes.description}</em>
              </p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Alerts;
