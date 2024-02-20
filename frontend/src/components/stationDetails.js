// StationDetails.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Map from './trainMap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function StationDetails() {
  const { stationId } = useParams() // Extract stationId from URL params
  const [station, setStation] = useState(null)

  let buttonStyling = {
    background: '#fffff',
    borderStyle: 'none',
  }
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

  const [basic] = useState([
    {
      tooltip: 'Very Bad',
    },
    {
      tooltip: 'Poor',
    },
    {
      tooltip: 'Ok',
      choosed: true,
    },
    {
      tooltip: 'Good',
    },
    {
      tooltip: 'Excellent',
    },
  ])

  if (!station) {
    return <div className='d-flex justify-content-center align-content-center'>Loading...</div>
  }

  return (
    <Container>
      <div>
        <div>
          <h1 className='d-flex justify-content-center align-content-center'>
            {station.attributes.name} {'- '}
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
          <Card className='border-0'>
            <div className='text-center'>
              <div>
                <h1>Want to review this station?</h1>
              </div>
              <Card className='border-0'>
                <div class='form-group d-flex flex-column align-items-center mb-4 '>
                  <select class='form-control mb-3 w-75'>
                    <option>Select one</option>
                    <option>Recommend</option>
                    <option>Not recommended</option>
                  </select>
                  <label for='exampleFormControlInput1' class='col-form-label'>
                    Give a brief description of why:
                  </label>
                  <input type='text' class='form-control w-75 py-5 align-top' id='review' placeholder='' />
                  <Button variant='primary' type='submit' onClick={''} style={{}} className='mt-2 col-1'>
                    Submit
                  </Button>
                </div>
              </Card>
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
