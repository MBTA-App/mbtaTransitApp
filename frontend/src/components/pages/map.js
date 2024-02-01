import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

const LeafletMap = ({ routeTypeFilter }) => {
  const [trainData, setTrainData] = useState([])

  useEffect(() => {
    // Fetch live train data from the MBTA API
    const fetchTrainData = async () => {
      try {
        if (routeTypeFilter !== undefined) {
          const response = await axios.get(`https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=${routeTypeFilter}`)
          console.log('route type filter: ' + routeTypeFilter)
          setTrainData(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching train data:', error)
      }
    }

    // Fetch train data every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchTrainData()
    }, 10000)

    // Initial fetch
    fetchTrainData()

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [routeTypeFilter])

  // Define subway icon
  const subwayIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/train.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  return (
    <MapContainer
      style={{ height: '500px', width: '100%' }}
      center={[42.3601, -71.0589]} // Set a default center
      zoom={13}
    >
      <TileLayer
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Map through trainData to create markers */}
      {trainData.map(train => (
        <Marker key={train.id} position={[train.attributes.latitude, train.attributes.longitude]} icon={subwayIcon}>
          <Popup>
            Train ID: {train.id}
            <br />
            Status: {train.attributes.current_status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default LeafletMap
