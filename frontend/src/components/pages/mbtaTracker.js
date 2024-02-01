import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
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
      <Card style={{ width: '80%', height: '80%' }} className='text-center bg-dark shadow-xl rounded border'>
        <div className='mt-4'>
          <button onClick={() => handleFilterClick(0)}>Tram</button>
          <button onClick={() => handleFilterClick(1)}>Subway</button>
          <button onClick={() => handleFilterClick(2)}>Rail</button>
          {/* Add more buttons for other route types if needed */}
        </div>
        <Card.Body className='d-flex flex-column align-items-center justify-content-center text-light'>
          <Card.Title>Live Tracker</Card.Title>
          <LeafletMap routeTypeFilter={routeTypeFilter} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Trackerpage
