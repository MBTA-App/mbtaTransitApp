import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ routeTypeFilter }) => {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    // Fetch live train data from the MBTA API
    const fetchTrainData = async () => {
      try {
        if (routeTypeFilter !== undefined) {
          const response = await axios.get(
            `https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=${routeTypeFilter}&api_key=b6bf1a2867354a9ea2add40062ff96f3`
          );
          console.log("route type filter: " + routeTypeFilter);
          // const trains = response.data.data

          // Fetch additional details for each train
          // const detailedTrains = await Promise.all(
          //   trains.map(async train => {
          //     // Get trip ID
          //     const tripId = train.relationships.trip.data.id

          //     // Fetch trip details
          //     const tripDetailsResponse = await axios.get(`https://api-v3.mbta.com/trips/${tripId}`)
          //     const directionId = tripDetailsResponse.data.data.attributes.direction_id

          //     // Merge direction_id into train object
          //     return { ...train, direction_id: directionId }
          //   })
          // )

          // Append the new train data to existing trainData
          setTrainData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };

    // Fetch train data every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchTrainData();
    }, 20000);

    // Initial fetch
    fetchTrainData();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [routeTypeFilter]);

  const getIconForLine = (routeData, train) => {
    const routeId = routeData?.id;
    // if routeTypeFilter is 3 (busses), return the busIcon (this is a problem when routeTypeFilter is null (shows all routes))
    if (routeTypeFilter === 3) {
      return busIcon;
    }

    if (routeTypeFilter === 0) {
      return tramIcon;
    }

    if (routeTypeFilter === 2) {
      return railTrainIcon;
    }

    // Assuming routeId represents the line color, you can map it to the corresponding icon
    const iconMapping = {
      Red: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + "/redTrain.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Green: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + "/greenTrain.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Blue: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + "/blueTrain.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Orange: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + "/orangeTrain.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),

      // Add more lines as needed
    };

    return iconMapping[routeId] || subwayIcon || busIcon; // Return subwayIcon if routeId is not recognized
  };

  // Define subway icon
  const subwayIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + "/defaulttrain.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const busIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + "/bus.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const tramIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + "/tramIcon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const railTrainIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + "/railTrain.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={[42.3601, -71.0589]}
      zoom={15}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {trainData.map((train) => (
        <Marker
          key={train.id}
          position={[train.attributes.latitude, train.attributes.longitude]}
          icon={getIconForLine(train.relationships.route.data)}
        >
          <Popup>
            Train ID: {train.id}
            <br />
            Status: {train.attributes.current_status}
            <br />
            Speed:{" "}
            {train.attributes.speed ? `${train.attributes.speed} mph` : "N/A"}
            <br />
            Direction: {train.direction_id ?? "N/A"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
