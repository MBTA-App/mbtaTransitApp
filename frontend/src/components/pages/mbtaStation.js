import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import axios from 'axios'

function Stations() {
  const [stations, setStations] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios('https://api-v3.mbta.com/stops?filter[route_type]=1')
      setStations(result.data.data)
    }
    fetchData()
  }, [])

  return (
    <Container className='mt-4'>
      <div>
        <h1 className='text-center'>MBTA Stations</h1>
        <p className='text-center'>Explore the different stations and give them a review!</p>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
        {stations.map(station => (
          <Col key={station.id}>
            <Link to={`/stations/${station.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                body
                outline
                color='info'
                className='mb-3 mx-auto'
                style={{
                  maxWidth: '100%',
                  backgroundColor: '#ADD8E6',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#14e367')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ADD8E6')}
              >
                <Card.Body>
                  <Card.Title>
                    <strong>{station.attributes.name}</strong>
                  </Card.Title>
                  <Card.Text>
                    <strong>Line:</strong> {station.attributes.address || 'Not available'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {station.attributes.address || 'Not available'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Municipality:</strong> {station.attributes.municipality}
                  </Card.Text>
                  <Card.Text>
                    <strong>Accessibility:</strong>{' '}
                    {station.attributes.wheelchair_boarding === 1 ? 'Accessible' : 'Inaccessible'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Stations
