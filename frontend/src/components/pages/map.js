import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const LeafletMap = () => {
  const [trainLocations, setTrainLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api-v3.mbta.com/vehicles");
        const { data } = response;
        setTrainLocations(data.data);
      } catch (error) {
        console.error("Error fetching train locations:", error);
      }
    };

    // Fetch data initially and set up interval for periodic updates
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContainer
      center={[42.3601, -71.0589]}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {trainLocations.map((train) => (
        <Marker
          key={train.id}
          position={[train.attributes.latitude, train.attributes.longitude]}
        >
          <Popup>{train.attributes.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
