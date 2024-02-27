// Map.js
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ latitude, longitude, stationName }) {
  const stopIcon = new L.icon({
    iconUrl: process.env.PUBLIC_URL + "/stopIcon.png",
    iconSize: [48, 48], // Adjust the size based on your icon dimensions
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} icon={stopIcon}>
        <Popup>{stationName}</Popup>
      </Marker>
    </MapContainer>
  );
}                        

export default Map;
