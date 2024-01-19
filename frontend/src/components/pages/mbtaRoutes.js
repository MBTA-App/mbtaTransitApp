import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import axios from 'axios';

function Routes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/routes?sort=description&include=line&filter%5Btype%5D=Light%20Rail%2C%20Green%20Line%2C%20Red%20Line%2C%20Blue%20Line%2C%20Orange%20Line%7C%7C',
      );
      setRoutes(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <Container className="mt-4"> {/* Add margin to the top of the container */}
  <div>
    <h1 className="text-center">MBTA Routes Information</h1>
    <p className="text-center">Explore details about different MBTA routes, including descriptions and direction destinations.</p>
  </div>

  <Row xs={1} md={2} lg={3} xl={4} className="g-4">
    {routes.map(route => (
      <Col key={route.id}>
        <Card
          body
          outline
          color="info"
          className="mb-3 mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <Card.Body>
            <Card.Title>{route.attributes.long_name}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {route.attributes.description}
            </Card.Text>
            <Card.Text>
              <strong>Direction Destinations:</strong> {route.attributes.direction_destinations.join(', ')}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
);
}

export default Routes;