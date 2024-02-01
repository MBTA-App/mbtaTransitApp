import React from 'react'
import { Card } from 'react-bootstrap'
import LeafletMap from './map' // Replace with the actual path to your LeafletMap component

const Trackerpage = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card style={{ width: '80%', height: '80%' }} className='text-center bg-dark shadow-xl rounded border'>
        <Card.Body className='d-flex flex-column align-items-center justify-content-center text-light'>
          <Card.Title>Live Tracker</Card.Title>
          <LeafletMap />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Trackerpage
