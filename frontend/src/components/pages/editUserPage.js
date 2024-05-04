import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'

const EditUserPage = () => {
  const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/editUser`
  const favoriteUrl = `${process.env.REACT_APP_BACKEND_SERVER_URI}/userFav/userFavorite`
  const getFavoritesUrl = `${process.env.REACT_APP_BACKEND_SERVER_URI}/userFav/getFavorites/`
  const navigate = useNavigate()

  // Extract user ID from the user object
  const userId = getUserInfo()?.id
  const [userFavorites, setUserFavorites] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')

  const [stations, setStations] = useState([])
  const [selectedStation, setSelectedStation] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    fetchStations()
    fetchUserFavorites()
  }, [])

  const fetchStations = async () => {
    try {
      const response = await fetch('https://api-v3.mbta.com/stops?filter[route_type]=1')
      const data = await response.json()
      setStations(
        data.data.map(station => ({
          id: station.id,
          name: station.attributes.name,
        }))
      )
    } catch (error) {
      console.error('Error fetching stations:', error)
    }
  }

  const fetchStationName = async stationId => {
    try {
      const response = await fetch(`https://api-v3.mbta.com/stops/${stationId}`)
      const data = await response.json()
      return data.data.attributes.name
    } catch (error) {
      console.error('Error fetching station name:', error)
      return null
    }
  }

  //module used to fetch the user favorite station data to the frontend
  const fetchUserFavorites = async () => {
    try {
      const response = await axios.get(getFavoritesUrl + userId)
      console.log('User favorites response:', response.data) // Log the server response
      const userFavoritesData = response.data

      if (!Array.isArray(userFavoritesData)) {
        console.error('User favorites data is not an array:', userFavoritesData)
        return
      }

      console.log('Stations:', stations) // Log the stations data

      // Filter out duplicate station IDs
      const uniqueStationIds = [...new Set(userFavoritesData.map(favorite => favorite.stationId))]

      const favoritesWithData = await Promise.all(
        userFavoritesData.map(async favorite => {
          const stationName = await fetchStationName(favorite.stationId)
          return {
            id: favorite.stationId,
            name: stationName || `Station ID: (${favorite.stationId})`,
          }
        })
      )

      setUserFavorites(favoritesWithData)
    } catch (error) {
      console.error('Error fetching user favorites:', error)
    }
  }

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...form, [input.id]: input.value })
    if (!!errors[input]) {
      setErrors({
        ...errors,
        [input]: null,
      })
    }
  }

  const handleDelete = async favoriteId => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/userFav/deleteFavorites/${userId}/${favoriteId}`)
      setUserFavorites(userFavorites.filter(favorite => favorite.id !== favoriteId))

      setDeleteMessage('Favorite station deleted successfully!')
      setErrors('')
    } catch (error) {
      console.error('Error deleting favorite station:', error)
      setErrors({ delete: 'Failed to delete favorite station' })
    }
  }

  const handleUserSubmit = async event => {
    event.preventDefault()
    // Check for form errors
    const newErrors = findFormErrors()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        // Send request to update user info
        const { data: res } = await axios.post(url, { ...form, userId })
        const { accessToken } = res
        localStorage.setItem('accessToken', accessToken)
        setSuccessMessage('User info updated successfully!')
        setErrors({})
        navigate('/privateuserprofile')
      } catch (error) {
        console.error('Error updating user info:', error)
        if (
          error.response &&
          error.response.status != 409 &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          window.alert(error.response.data.message)
        }
        if (error.response && error.response.status === 409) {
          setErrors({ username: 'Username is taken, please choose another' })
        }
      }
    }
  }

  const handleFavoriteSubmit = async event => {
    event.preventDefault()
    // Find the selected station object
    const selectedStationObject = stations.find(station => station.name === selectedStation)

    // Check if a station is selected
    if (!selectedStation) {
      setErrors({ station: 'Please select a favorite station' })
      return
    }

    // Extract the station ID
    const stationId = selectedStationObject.id

    try {
      // Send request to update favorite station
      const response = await axios.post(favoriteUrl, {
        user: userId,
        stationId: stationId,
      })

      console.log(response)

      // Extract the ID of the newly added favorite station from the response
      const newFavoriteId = response.data.stationId

      console.log(newFavoriteId)

      // Construct the new favorite object
      const newFavorite = {
        id: newFavoriteId,
        // Other properties of the favorite station if available
      }

      // Update the userFavorites state by appending the new favorite
      console.log('New Favorite:', newFavorite)
      console.log('New Favorite:', newFavoriteId)

      setUserFavorites([...userFavorites, newFavorite])

      setSuccessMessage('Favorite station updated successfully!')
      // Clear errors after successful update
      setErrors({})
    } catch (error) {
      console.error('Error updating favorite station:', error)
      if (error.response && error.response.status === 409) {
        setErrors({ station: 'Station update failed, please try again' })
      }
    }
  }

  const findFormErrors = () => {
    const { username, email, password } = form
    const newErrors = {}
    if (!username || username === '') newErrors.username = 'Enter a valid username'
    else if (username.length < 6) newErrors.username = 'Username must be at least 6 characters'
    if (!email || email === '') newErrors.email = 'Enter a valid email address'
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email address'
    if (!password || password === '') newErrors.password = 'Enter a valid password'
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    return newErrors
  }

  const handleCancel = () => {
    navigate('/privateuserprofile')
  }
  return (
    <div style={{ marginLeft: '8rem', width: '400px', marginRight: '2rem' }}>
      <Card body outline color='success' className='mx-1 my-2' style={{ width: '400px' }}>
        <Card.Title>Edit User Information</Card.Title>
        <Card.Body>
          {successMessage && <div className='alert alert-success'>{successMessage}</div>}

          <Form onSubmit={handleUserSubmit}>
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter new username'
                id='username'
                value={form.username}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter new email address'
                id='email'
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter new password'
                id='password'
                value={form.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Update User Info
            </Button>
          </Form>

          <hr />

          <Form onSubmit={handleFavoriteSubmit}>
            <Form.Group className='mb-3' controlId='formFavorite'>
              <Form.Label>Select a Favorite Station</Form.Label>
              <Form.Select
                value={selectedStation || ''}
                onChange={e => setSelectedStation(e.target.value)}
                isInvalid={!!errors.station}
              >
                <option value=''>Select a Favorite Station</option>
                {stations.map(station => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.station}</Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Update Favorite Station
            </Button>
            <p></p>
            {
              <div>
                {deleteMessage && <div className='alert alert-danger'>{deleteMessage}</div>}
                <h4>My Favorite Stations:</h4>
                <ul>
                  {userFavorites.map(favorite => (
                    <li key={favorite.id}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1' }}>{favorite.name}</div>

                        <div>
                          <button
                            onClick={() => handleDelete(favorite.id)}
                            style={{
                              marginTop: '4px',
                              backgroundColor: '#B30000',
                              border: 'none',
                              color: 'white',
                              padding: '10px 20px',
                              textAlign: 'center',
                              textDecoration: 'none',
                              borderRadius: '5px',
                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EditUserPage
