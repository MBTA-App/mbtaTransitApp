// StationDetails.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Map from './trainMap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

function StationDetails() {
  const { stationId } = useParams() // Extract stationId from URL params
  const [station, setStation] = useState(null)

  useEffect(() => {
    async function fetchStationDetails() {
      try {
        const result = await axios(`https://api-v3.mbta.com/stops/${stationId}`)
        setStation(result.data.data)
      } catch (error) {
        console.error('Error fetching station details:', error)
      }
    }

    fetchStationDetails()
  }, [stationId])

  if (!station) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div>
        <div>
          <h1 className='d-flex justify-content-center align-content-center'>
            {station.attributes.platform_name} {'- '}
            {station.attributes.description ? station.attributes.description.split('-')[1]?.trim() : 'Not available'}
          </h1>
          <Card>
            <Map
              latitude={station.attributes.latitude}
              longitude={station.attributes.longitude}
              stationName={station.attributes.platform_name}
            />
          </Card>
          <Container className='justify-content-center align-content-center d-flex'>
            <div style={{ width: '100%' }} className='card border-0 text-center'>
              <div className='row justify-content-center align-content-center'>
                <div className='col-sm-2'>
                  <p>
                    <strong>Address:</strong> {station.attributes.address}
                  </p>
                </div>
                <div className='col-sm-2'>
                  <p>
                    <strong>Latitude:</strong> {station.attributes.latitude}
                  </p>
                </div>
                <div className='col-sm-2'>
                  <p>
                    <strong>Longitude:</strong> {station.attributes.longitude}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <Card>
            <div className='text-center'>
              <div>
                <h1>Leave a review:</h1>
              </div>
            </div>
          </Card>
          <Card className='mt-4'>
            <div className='text-center'>
              <div>
                <h1>View Reviews</h1>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    </Container>
  )
}

export default StationDetails
