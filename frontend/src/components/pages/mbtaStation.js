import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import getUserInfo from '../../utilities/decodeJwt'
import { FaStar } from 'react-icons/fa'
import '../../styles.css'
import { FaWheelchair } from 'react-icons/fa'

function Stations() {
  const [stations, setStations] = useState([])

  const [userFavorites, setUserFavorites] = useState([])
  const [filterActive, setFilterActive] = useState(false)
  const [filteredStations, setFilteredStations] = useState([])
  const [lineFilter, setLineFilter] = useState(null)
  const [address, setAddress] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios('https://api-v3.mbta.com/stops?filter[route_type]=1')
        const stations = result.data.data

        const stationsWithAddresses = await Promise.all(
          stations.map(async station => {
            const latitude = station.attributes.latitude
            const longitude = station.attributes.longitude
            const address = await getReverseGeocode(latitude, longitude)
            return { ...station, address }
          })
        )

        setStations(stationsWithAddresses)
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }

    fetchData()
  }, [])

  const apiKey = 'AIzaSyCvBDAvo5zxxkI5AHcZM091KvLoZf5Oi2c'

  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      )
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].formatted_address
      } else {
        return 'Address not found'
      }
    } catch (error) {
      console.error('Error fetching reverse geocode:', error)
      return 'Error fetching address'
    }
  }

  const userId = getUserInfo()?.id

  useEffect(() => {
    async function fetchUserFavorites() {
      const getFavoritesUrl = `${process.env.REACT_APP_BACKEND_SERVER_URI}/userFav/getFavorites/${userId}`

      // Check if userId is defined
      if (userId) {
        try {
          const response = await axios.get(getFavoritesUrl)
          setUserFavorites(response.data)
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching user favorites:', error)
        }
      }
    }

    fetchUserFavorites()
  }, [userId, address]) // Add userId and stations to dependency array

  useEffect(() => {
    // Extract stationIds from userFavorites
    const stationIds = userFavorites.map(item => String(item.stationId))

    // Filter stations based on stationIds
    const filteredStations = stations.filter(station => stationIds.includes(station.id))
    console.log(filteredStations)

    setFilteredStations(filteredStations)
    console.log('Filtered Stations:', filteredStations)
  }, [userFavorites, stations])

  // Function to toggle the filter
  const toggleFilter = () => {
    setFilterActive(!filterActive)
  }

  const handleLineFilter = line => {
    console.log(line)
    setLineFilter(line)
  }

  const filteredStationsToShow = filterActive
    ? filteredStations
      ? filteredStations.filter(station => {
          // Extract the middle part of the description
          const middleDescription = station.attributes.description.split('-')[1]?.trim()
          // Check if the middle description includes the selected line filter
          return lineFilter ? middleDescription.includes(lineFilter) : true
        })
      : []
    : stations.filter(station => {
        // Extract the middle part of the description
        const middleDescription = station.attributes.description.split('-')[1]?.trim()
        // Check if the middle description includes the selected line filter
        return lineFilter ? middleDescription.includes(lineFilter) : true
      })
  const renderErrorMessage = () => {
    if (filteredStationsToShow.length === 0) {
      return <div className='text-center fs-4 fw-bold'>No lines to show.</div>
    }
  }

  return (
    <Container fluid className=''>
      <Card.Body>
        <Row className='justify-content-center'>
          <Col xs={18} sm={16} md={12} lg={15} style={{ padding: '1%' }}>
            <Card className=' mb-4 text-center rounded shadow ' style={{ backgroundColor: '#165c96' }}>
              <header className='jumbotron '>
                <div className='container'>
                  <h1 className='display-4 text-white' style={{ fontWeight: 'bold', fontSize: '3.5rem' }}>
                    MBTA Stations
                  </h1>
                  <p className='lead text-white'>Explore the different stations and give them a review!</p>
                </div>
              </header>
            </Card>
          </Col>
          <Container className='d-flex justify-content-center align-items-center mb-2'>
            <div className='d-flex flex-wrap justify-content-center'>
              <button
                className={`text-center btn me-2 mb-2 ${filterActive ? 'bg-info' : 'bg-info'}`}
                onClick={toggleFilter}
                style={{
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                }}
              >
                {filterActive ? 'Show All Stations' : 'Favorites'}
              </button>
              {!filterActive && (
                <>
                  <button
                    className={`btn btn-secondary me-2 mb-2 ${lineFilter === '' ? 'active' : ''}`}
                    onClick={() => handleLineFilter('')}
                  >
                    All
                  </button>
                  <button
                    className={`btn btn-success me-2 mb-2 ${lineFilter === 'Green' ? 'active' : ''}`}
                    onClick={() => handleLineFilter('Green')}
                  >
                    Green Line
                  </button>
                  <button
                    className={`btn btn-danger me-2 mb-2 ${lineFilter === 'Red' ? 'active' : ''}`}
                    onClick={() => handleLineFilter('Red')}
                  >
                    Red Line
                  </button>
                  <button
                    className={`btn btn-primary me-2 mb-2 ${lineFilter === 'Blue' ? 'active' : ''}`}
                    onClick={() => handleLineFilter('Blue')}
                  >
                    Blue Line
                  </button>
                  <button
                    className={`btn btn-warning me-2 mb-2 ${lineFilter === 'Orange' ? 'active' : ''}`}
                    onClick={() => handleLineFilter('Orange')}
                  >
                    Orange Line
                  </button>
                </>
              )}
            </div>
          </Container>

          {renderErrorMessage()}
          <Row xs={1} md={2} lg={3} xl={3} xxxl={4} className=''>
            {filterActive
              ? filteredStations.map(station => (
                  <Col key={station.id}>
                    <Link to={`/stations/${station.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card
                        body
                        outline
                        color='info'
                        className='mb-3 mx-auto mt-4 border-0 shadow'
                        style={{
                          height: '80%',

                          maxWidth: '90%',
                          backgroundColor: 'lightgreen',
                          transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'green')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'lightgreen')}
                      >
                        <FaStar
                          style={{
                            fontSize: '2rem',
                            position: 'absolute',
                            top: 5,
                            left: 5,
                            color: 'yellow',
                            zIndex: 1, // To place the star above the card content
                          }}
                        />
                        <Card.Body
                          className='d-flex justify-content-center align-items-center flex-column text-center'
                          style={{ minHeight: '300px', minWidth: '300px' }}
                        >
                          <Card.Title style={{ fontSize: '3.5rem' }}>
                            <strong>{station.attributes.name}</strong>
                          </Card.Title>
                          <Card.Text className='mx-4 text-start border-0 bg-transparent'>
                            <p className='mt-2'>
                              <strong>{station.address}</strong>
                            </p>

                            <Card.Text className='d-flex mt-4 justify-content-center align-items-center'>
                              <span className='ms-4'>
                                {station.attributes.wheelchair_boarding === 1 ? (
                                  <FaWheelchair style={{ fontSize: '3em' }} />
                                ) : (
                                  'Inaccessible'
                                )}
                              </span>
                            </Card.Text>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              : filteredStationsToShow.map(station => (
                  <Col key={station.id}>
                    <Link to={`/stations/${station.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card
                        body
                        outline
                        className={`mb-3 mx-auto mt-4 border-0 shadow ${
                          filterActive && lineFilter === '' ? 'filtered-card' : ''
                        } ${lineFilter ? lineFilter.toLowerCase() + '-card' : 'default-card'}`}
                        style={{
                          height: '80%',

                          maxWidth: '90%',
                          transition: 'background-color 0.3s',
                          backgroundColor: 'grey',
                        }}
                      >
                        <Card.Body
                          className='d-flex justify-content-center align-items-center flex-column text-center'
                          style={{ minHeight: '100%', minWidth: '50%' }}
                        >
                          <Card.Title style={{ fontSize: '3rem' }}>
                            <strong>{station.attributes.name}</strong>
                          </Card.Title>
                          <Card.Text className='mx-4 text-center border-0 bg-transparent'>
                            <p className='mt-2'>
                              <strong>{station.address}</strong>
                            </p>

                            <Card.Text className='d-flex mt-4  justify-content-center align-items-center'>
                              <span className='ms-4'>
                                {station.attributes.wheelchair_boarding === 1 ? (
                                  <FaWheelchair className='mb-4' style={{ fontSize: '3em' }} />
                                ) : (
                                  'Inaccessible'
                                )}
                              </span>
                            </Card.Text>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
          </Row>
        </Row>
      </Card.Body>
    </Container>
  )
}

export default Stations
