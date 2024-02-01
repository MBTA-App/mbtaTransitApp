import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const LeafletMap = () => {
  return (
    <MapContainer style={{ height: '500px', width: '100%' }} center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.5, -0.09]}>
        <Popup>
          A pretty CSS popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default LeafletMap
