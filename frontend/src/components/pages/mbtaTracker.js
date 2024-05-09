import React, { useState } from 'react'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'
import LeafletMap from './map' // Replace with the actual path to your LeafletMap component

const Trackerpage = () => {
  const [routeTypeFilter, setRouteTypeFilter] = useState(null)

  const handleFilterClick = routeType => {
    setRouteTypeFilter(routeType)
    console.log('Route Type: ' + routeType)
  }

  console.log('Current Route Type Filter: ', routeTypeFilter) // Log the current routeTypeFilter

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col xs={18} sm={16} md={12} lg={14} style={{ padding: '1%' }}>
          <Card className=' text-center rounded shadow ' style={{ backgroundColor: '#165c96' }}>
            {' '}
            <h1 className='display-4 text-white' style={{ fontWeight: 'bold', fontSize: '3.5rem' }}>
              Live Tracker
            </h1>
            <div className='mb-1'>
              <Button
                style={{
                  backgroundColor: routeTypeFilter === 0 ? 'darkorange' : 'green',
                  margin: '4px',
                }} // Change background color conditionally
                onClick={() => handleFilterClick(0)}
              >
                Tram
              </Button>
              <Button
                style={{
                  backgroundColor: routeTypeFilter === 1 ? 'darkorange' : 'green',
                  margin: '4px',
                }} // Change background color conditionally
                onClick={() => handleFilterClick(1)}
              >
                Subway
              </Button>

              <Button
                style={{
                  backgroundColor: routeTypeFilter === 2 ? 'darkorange' : 'green',
                  margin: '4px',
                }}
                onClick={() => handleFilterClick(2)}
              >
                Rail
              </Button>
              <Button
                style={{
                  backgroundColor: routeTypeFilter === 3 ? 'darkorange' : 'green',
                  margin: '4px',
                }}
                onClick={() => handleFilterClick(3)}
              >
                Bus
              </Button>
              <Button
                style={{
                  backgroundColor: routeTypeFilter === 4 ? 'darkorange' : 'green',
                  margin: '4px',
                }}
                onClick={() => handleFilterClick(4)}
              >
                Ferry
              </Button>
              {/* Add more buttons for other route types if needed */}
            </div>
          </Card>
        </Col>
        <Container style={{ width: '100%' }}>
          <LeafletMap routeTypeFilter={routeTypeFilter} />
        </Container>
      </Row>
    </Container>
  )
}

export default Trackerpage
