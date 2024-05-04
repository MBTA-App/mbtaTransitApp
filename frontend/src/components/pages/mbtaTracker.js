import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import LeafletMap from './map' // Replace with the actual path to your LeafletMap component

const Trackerpage = () => {
  const [routeTypeFilter, setRouteTypeFilter] = useState(null)

  const handleFilterClick = routeType => {
    setRouteTypeFilter(routeType)
    console.log('Route Type: ' + routeType)
  }

  console.log('Current Route Type Filter: ', routeTypeFilter) // Log the current routeTypeFilter

  return (
    <div className='vh-100'>
      <Card
        style={{
          height: '80vh',
          marginLeft: '8rem',
          minWidth: '300px',
          zIndex: '1',
          maxHeight: '100%',
        }}
        className='text-center bg-white shadow-xl rounded border-0'
      >
        <Card.Body className=''>
          <div className='  d-flex flex-column align-items-center justify-content-center text-light'>
            <div
              className='rounded mb-2'
              style={{
                backgroundColor: '#165c96',
                minWidth: '95%',
              }}
            >
              <Card.Title className='display-4 text-white' style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                Live Tracker
              </Card.Title>
              <div className='mb-2'>
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
            </div>
          </div>

          <LeafletMap routeTypeFilter={routeTypeFilter} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Trackerpage
