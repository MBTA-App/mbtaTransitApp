import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [serviceType, setServiceType] = useState('') // State to store service type filter

  useEffect(() => {
    async function fetchData() {
      try {
        let url = 'https://api-v3.mbta.com/alerts?sort=-updated_at&filter[activity]=BOARD,EXIT,RIDE'

        // Append service type filter to the URL if a service type is selected
        if (serviceType) {
          url += `&filter[route_type]=${serviceType}`
        }

        const result = await axios.get(url)
        setAlerts(result.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [serviceType]) // Fetch data whenever serviceType changes

  const handleFilterChange = event => {
    setServiceType(event.target.value)
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '900px' }}>
      <div className=' rounded' style={{ backgroundColor: '#165c96' }}>
        <div className='text-center mt-4 text-white'>
          <h1 style={{ fontSize: '3rem', width: '' }}>All MBTA Alerts</h1>
        </div>
        {/* Filter input */}
        <div className=' d-flex justify-content-center align-content-center p-2'>
          <select className='form-select ' style={{ width: '50%' }} value={serviceType} onChange={handleFilterChange}>
            <option value=''>All Service Types</option>
            <option value='0'>Tram, Streetcar, Light rail</option>
            <option value='1'>Subway, Metro</option>
            <option value='2'>Rail</option>
            <option value='3'>Bus</option>
            <option value='4'>Ferry</option>
          </select>
        </div>
      </div>
      <div className='mt-4'>
        {/* Display alerts */}
        {alerts.map(alert => (
          <div
            key={alert.id}
            style={{
              marginBottom: '20px',
              backgroundColor: '#FFEB99',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
            >
              <h2 style={{ margin: '0', fontStyle: 'italic' }}>Alert</h2>
              <small>{new Date(alert.attributes.updated_at).toLocaleString()}</small>
            </div>
            <p style={{ margin: '0', marginBottom: '10px' }}>
              <em>{alert.attributes.header}</em>
            </p>
            <p style={{ margin: '0' }}>
              <em>{alert.attributes.description}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alerts
