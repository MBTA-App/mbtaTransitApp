import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";


function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "https://api-v3.mbta.com/alerts?sort=-updated_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE"
        );
        setAlerts(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ margin: '0 auto', maxWidth: '900px' }}>
      <div className="text-center mt-4">
        <h1>MBTA Recent Alerts</h1>
      </div>
      <div className="mt-4">
        {alerts.map((alert) => (
          <div key={alert.id} style={{ marginBottom: '20px', backgroundColor: '#FFEB99', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{ margin: '0', fontStyle: 'italic' }}>Alert</h2>
              <small>{new Date(alert.attributes.updated_at).toLocaleString()}</small>
            </div>
            <p style={{ margin: '0', marginBottom: '10px' }}><em>{alert.attributes.header}</em></p>
            <p style={{ margin: '0' }}><em>{alert.attributes.description}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
