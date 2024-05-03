import React, { useEffect, useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import LeafletMap from './map' // Replace with the actual path to your LeafletMap component

const Trackerpage = () => {
  const [routeTypeFilter, setRouteTypeFilter] = useState(null)

  const handleFilterClick = routeType => {
    setRouteTypeFilter(routeType)
    console.log('Route Type: ' + routeType)
  }

  console.log('Current Route Type Filter: ', routeTypeFilter) // Log the current routeTypeFilter

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card
        style={{ width: '90%', height: '99%', marginLeft: '10%' }}
        className='text-center bg-white shadow-xl rounded border-0'
      >
        <Card.Body className='d-flex flex-column align-items-center justify-content-center text-light'>
          <Card.Title className='display-4 text-black' style={{ fontSize: '4rem', fontWeight: 'bold' }}>
            Live Tracker
          </Card.Title>
          <div className='mb-2'>
            <Button
              style={{ backgroundColor: routeTypeFilter === 0 ? 'green' : 'blue', margin: '4px' }} // Change background color conditionally
              onClick={() => handleFilterClick(0)}
            >
              Tram
            </Button>
            <Button
              style={{ backgroundColor: routeTypeFilter === 1 ? 'green' : 'blue', margin: '4px' }} // Change background color conditionally
              onClick={() => handleFilterClick(1)}
            >
              Subway
            </Button>

            <Button
              style={{ backgroundColor: routeTypeFilter === 2 ? 'green' : 'blue', margin: '4px' }}
              onClick={() => handleFilterClick(2)}
            >
              Rail
            </Button>
            <Button
              style={{ backgroundColor: routeTypeFilter === 3 ? 'green' : 'blue', margin: '4px' }}
              onClick={() => handleFilterClick(3)}
            >
              Bus
            </Button>
            <Button
              style={{ backgroundColor: routeTypeFilter === 4 ? '#000080' : 'blue', margin: '4px' }}
              onClick={() => handleFilterClick(4)}
            >
              Ferry
            </Button>
            {/* Add more buttons for other route types if needed */}
          </div>

          <LeafletMap routeTypeFilter={routeTypeFilter} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Trackerpage
