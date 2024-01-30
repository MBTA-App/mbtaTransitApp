import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'


function Alerts() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);


  return (
    <Container>
 <div>
    <h1 className="text-center mt-4">MBTA Alerts</h1>
  </div>
    <div className='mb-2'>
    <Row xs={1} md={1} lg={1} xl={1} className="g-6 mt-4">

      {alerts.map(alert => (
        <Col key={alert.id}>

        <Card
       body
       outline
       color="light"
       className="mb-3 mx-auto"
       style={{ maxWidth:'900px', backgroundColor: '#FFD2D2'}}
        >
        <Card.Body>
        <Card.Title>Alert</Card.Title>
        <Card.Text>{alert.attributes.header}{alert.attributes.description}</Card.Text>
        </Card.Body>
      </Card>
      </Col>
      ))}
    </Row>


        <h1>Alerts!</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.attributes.header}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
      </Container>
  );
}


export default Alerts;
