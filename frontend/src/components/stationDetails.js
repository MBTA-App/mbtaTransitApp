// StationDetails.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
    <div>
      <div>
        <h1>
          {station.attributes.platform_name} {'- '}
          {station.attributes.description ? station.attributes.description.split('-')[1]?.trim() : 'Not available'}
        </h1>
        <p>
          <strong>Address:</strong> {station.attributes.address}
        </p>
        <p>
          <strong>Latitude:</strong> {station.attributes.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {station.attributes.longitude}
        </p>
      </div>
      <div>
        <h1>Leave a review:</h1>
      </div>
      <div>
        <h1>View Reviews</h1>
      </div>
    </div>
  )
}

export default StationDetails
