// StationDetails.js
import '../../styles.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { api } from '../../utilities/api'
import Map from '../trainMap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import getUserInfo from '../../utilities/decodeJwt'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { satisfies } from 'semver'
import styles from '../../styles.css'

function StationDetails({ recommendCount, notRecommendedCount }) {
  const [deleteStatuses, setDeleteStatuses] = useState({})

  const { stationId } = useParams() // Extract stationId from URL params
  const [station, setStation] = useState(null)
  const [reviews, setReviews] = useState([]) // New state for reviews
  const [reviewRatings, setReviewRatings] = useState([]) // New state for reviews
  const [submitStatus, setSubmitStatus] = useState(null) // New state for submit status
  const [userInfo, setUserInfo] = useState(null) // New state for user information
  const [deleteStatus, setDeleteStatus] = useState(null)
  const [alerts, setAlerts] = useState([])

  const [recommendationCount, setRecommendationCount] = useState(0)
  const [notRecommendationCount, setNotRecommendationCount] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [address, setAddress] = useState('')
  const [icon, setIcon] = useState(<FaAngleDown />) // Initialize icon state
  const [displayedAlerts, setDisplayedAlerts] = useState([])

  const [reviewData, setReviewData] = useState({
    //default values
    recommendation: '',
    description: '',
    user: '',
    stationId: stationId,
  })

  const [ratingData, setRatingData] = useState({
    //default values
    username: '',
    stationId: stationId,
  })

  useEffect(() => {
    // Fetch user info
    const currentUserInfo = getUserInfo()

    setUserInfo(currentUserInfo)

    // Set the initial 'user' field in the review data
    setReviewData(prevData => ({
      ...prevData,
      user: currentUserInfo ? currentUserInfo.username : '',
    }))

    setRatingData(prevData => ({
      ...prevData,
      username: currentUserInfo ? currentUserInfo.username : '',
    }))
  }, [])

  const handleReviewChange = input => {
    setReviewData({ ...reviewData, [input.name]: input.value })
  }

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

  const submitReview = async e => {
    e.preventDefault()
    try {
      // Assuming you have a reviews endpoint for submitting reviews
      const response = await axios.post(`http://localhost:8081/userReview/reviews`, {
        stationId: stationId, // Add stationId to associate the review with the station
        ...reviewData,
      })

      setReviews([...reviews, response.data])
      setReviewData({
        recommendation: '',
        description: '',
        user: userInfo ? userInfo.username : '',
        stationId: stationId,
      })

      // Optionally, you can perform any additional actions after a successful submission
      // For example, updating the UI or navigating to a different page
      console.log('Review submitted successfully!')
      setSubmitStatus('Success')
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitStatus('Error')
    }
  }

  const deleteReview = async (e, reviewId) => {
    e.preventDefault()
    try {
      // Assuming you have a reviews endpoint for deleting reviews
      await axios.delete(`http://localhost:8081/userReview/deleteReviews/${reviewId}`)

      setReviews(reviews.filter(review => review._id !== reviewId))

      setDeleteStatuses({ ...deleteStatuses, [reviewId]: 'Success' })

      // Optionally, you can perform any additional actions after a successful deletion
      // For example, updating the UI or reloading the reviews
      console.log('Review deleted successfully!')
    } catch (error) {
      console.error('Error deleting review:', error)
      setDeleteStatuses({ ...deleteStatuses, [reviewId]: 'Error' })
    }
  }

  // Define the fetchReviewRatings function
  const fetchReviewRatings = async reviewId => {
    try {
      const response = await axios.get(`http://localhost:8081/reviewRating/getRatings/${reviewId}`)
      const ratings = response.data

      let thumbsUpCount = 0
      let thumbsDownCount = 0

      ratings.forEach(rating => {
        if (rating.voteType === 1) {
          thumbsUpCount++
        } else if (rating.voteType === 0) {
          thumbsDownCount++
        }
      })

      return { thumbsUpCount, thumbsDownCount }
    } catch (error) {
      console.error('Error fetching review ratings:', error)
      return { thumbsUpCount: 0, thumbsDownCount: 0 } // Return default values on error
    }
  }

  const handleToggleReviewForm = () => {
    setShowReviewForm(!showReviewForm) // Toggle the state
  }

  const handleVote = async (reviewId, voteType, stationId) => {
    try {
      await axios.post(`http://localhost:8081/reviewRating/rateReview/${reviewId}`, {
        voteType,
        stationId,
        ...ratingData,
      })

      // Fetch updated vote counts after voting
      const { thumbsUpCount, thumbsDownCount } = await fetchReviewRatings(reviewId)

      // Update the reviews array with the updated counts
      const updatedReviews = reviews.map(review => {
        if (review._id === reviewId) {
          return {
            ...review,
            thumbsUp: thumbsUpCount,
            thumbsDown: thumbsDownCount,
          }
        }
        return review
      })

      // Set the state with the updated reviews
      setReviews(updatedReviews)
    } catch (error) {
      console.error('Error recording vote:', error)
    }
  }
  useEffect(() => {
    // Fetch initial reviews data when component mounts
    // Example: axios.get('http://localhost:8081/reviews').then(response => setReviews(response.data));
  }, []) // Add any dependencies if needed

  let buttonStyling = {
    background: '#fffff',
    borderStyle: 'none',
  }
  useEffect(() => {
    async function fetchStationDetails() {
      try {
        const result = await axios(`https://api-v3.mbta.com/stops/${stationId}`)
        setStation(result.data.data)
      } catch (error) {
        console.error('Error fetching station details:', error)
      }
    }

    async function fetchReviews() {
      try {
        const reviewsResult = await api.get(`/userReview/getReviews/${stationId}`)
        const fetchedReviews = reviewsResult.data

        let recommendCount = 0
        let notRecommendedCount = 0

        fetchedReviews.forEach(review => {
          if (review.recommendation === 'Recommended') {
            recommendCount++
          } else if (review.recommendation === 'Not Recommended') {
            notRecommendedCount++
          }
        })

        setRecommendationCount(recommendCount)
        setNotRecommendationCount(notRecommendedCount)

        console.log(recommendCount)
        console.log(notRecommendedCount)

        // Fetch review ratings for each review
        const updatedReviews = await Promise.all(
          fetchedReviews.map(async review => {
            try {
              // Fetch review ratings for the current review
              const response = await axios.get(`http://localhost:8081/reviewRating/getRatings/${review._id}`)
              const ratings = response.data

              let thumbsUpCount = 0
              let thumbsDownCount = 0

              // Calculate thumbs up and thumbs down counts
              ratings.forEach(rating => {
                if (rating.voteType === 1) {
                  thumbsUpCount++
                } else if (rating.voteType === 0) {
                  thumbsDownCount++
                }
              })

              // Update the review object with thumbs up and thumbs down counts
              return {
                ...review,
                thumbsUp: thumbsUpCount,
                thumbsDown: thumbsDownCount,
              }
            } catch (error) {
              console.error('Error fetching review ratings:', error)
              return review // Return the original review if there's an error
            }
          })
        )
        setReviews(updatedReviews) // Update the state with reviews containing thumbs up and thumbs down counts
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    async function fetchAlerts() {
      try {
        const response = await axios.get(`https://api-v3.mbta.com/alerts?filter[stop]=${stationId}`)
        const alertData = response.data.data

        setAlerts(alertData)
      } catch (error) {
        console.log('error in getting alerts', error)
      }
    }

    async function fetchData() {
      // Fetch reviews and station details concurrently
      await Promise.all([fetchReviews(), fetchStationDetails()])
      // Fetch review ratings after reviews and station details are fetched
      // await fetchReviewRatingsOnLoad();
    }

    fetchData()
    fetchAlerts()
  }, [stationId, address])

  useEffect(() => {
    if (station) {
      // Extract latitude and longitude from station data
      const latitude = station.attributes.latitude
      const longitude = station.attributes.longitude
      console.log(latitude, longitude)

      // Call reverse geocode function to get address
      async function getAddress() {
        const address = await getReverseGeocode(latitude, longitude)
        console.log(address)
        setAddress(address)
      }

      getAddress()
    }
  }, [station]) // Make sure to include station as a dependency

  if (!station) {
    return <div className='d-flex justify-content-center align-content-center'>Loading...</div>
  }

  return (
    <Container style={{ padding: '4px', marginLeft: '11%' }}>
      <div>
        <div>
          <h1 className='d-flex justify-content-center align-content-center'>
            {station.attributes.name} {'- '}
            {station.attributes.description ? station.attributes.description.split('-')[1]?.trim() : 'Not available'}
          </h1>
          <Container>
            <div className='d-flex justify-content-center'>
              <Card className='mb-2 border-0 rounded shadow bg-danger text-white' style={{ width: '100%' }}>
                {alerts.length === 0 ? (
                  <p className='d-flex justify-content-center mt-2 w-full'>
                    There are no ongoing alerts for this station.
                  </p>
                ) : (
                  <div className='alert-container'>
                    <h2 className='d-flex justify-content-center mt-2 '>Alerts</h2>
                    <ul className='alert-list'>
                      {alerts.map(alert => (
                        <li key={alert.id} className='alert-item'>
                          <p>{alert.attributes.header}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </div>
          </Container>

          <Card>
            <Map
              longitude={station.attributes.longitude}
              latitude={station.attributes.latitude}
              stationName={station.attributes.platform_name}
            />
          </Card>
          <div>
            <h2
              className='text-center mt-2'
              style={{
                fontSize: '16px',
                color:
                  recommendationCount === 0 && notRecommendationCount === 0
                    ? 'orange'
                    : recommendationCount > notRecommendationCount
                    ? 'green'
                    : 'red',
              }}
            >
              {recommendationCount === 0 && notRecommendationCount === 0
                ? 'Users have not reviewed this station yet.'
                : `Based on reviews, most users ${
                    recommendationCount > notRecommendationCount
                      ? 'recommend this station!'
                      : 'do not recommend this station!'
                  }`}
            </h2>
          </div>

          <Container className='justify-content-center align-content-center d-flex'>
            <div style={{ width: '100%' }} className='card border-0 text-center'>
              <div className='row justify-content-center align-content-center'>
                <div className='col-sm-2'>
                  <p>
                    <strong>{address}</strong>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div>
            <Button
              className='mx-auto d-block bg-success'
              onClick={() => {
                handleToggleReviewForm()
                setIcon(showReviewForm ? <FaAngleDown /> : <FaAngleUp />) // Change icon based on state
              }}
            >
              {showReviewForm ? 'Create a review ' : 'Create a review'}
              {icon} {/* Render the icon based on the state */}
            </Button>
            {showReviewForm && (
              <Card className='border-0'>
                <div className='text-center'>
                  <div>
                    <h1>Want to review this station?</h1>
                  </div>
                  <Card className='border-0'>
                    <div className='form-group d-flex flex-column align-items-center mb-4'>
                      <select
                        className='form-control mb-3 w-75'
                        name='recommendation' // Add the name attribute
                        onChange={e => handleReviewChange(e.target)}
                      >
                        <option>Select one</option>
                        <option>Recommended</option>
                        <option>Not Recommended</option>
                      </select>
                      <label htmlFor='exampleFormControlInput1' className='col-form-label'>
                        Give a brief description of why:
                      </label>
                      <textarea
                        type='text'
                        className='form-control w-75 py-5 align-top text-center'
                        id='review'
                        name='description' // Add the name attribute
                        value={reviewData.description}
                        onChange={e => handleReviewChange(e.target)}
                        placeholder=''
                      />
                      <Button
                        variant='primary'
                        type='submit'
                        onClick={submitReview}
                        style={buttonStyling}
                        className='mt-2 col-sm-3 col-lg-2 col-md-2'
                      >
                        Submit
                      </Button>
                    </div>
                  </Card>
                  {submitStatus === 'Success' && <div className='text-success'>Review submitted successfully!</div>}
                  {submitStatus === 'Error' && (
                    <div className='text-danger'>Error submitting review. Please try again.</div>
                  )}
                </div>
              </Card>
            )}
          </div>
          <Container className='mt-4 border-0'>
            <div className='d-flex justify-content-center p-4'>
              <div>
                <h1 className='text-center'>Recent Reviews</h1>
                <Card className='border-0 '>
                  {reviews
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date in descending order
                    .map(review => (
                      <div className='mt-2' key={review._id}>
                        {/* Display each review here */}
                        {review && review.user && (
                          <>
                            {/* <p className="text-black text-left px-4">
                              <b>{review.user}</b>
                            </p> */}
                            <div className='d-flex justify-content-center'>
                              <Card className='border-0 '>
                                <p className='text-center text-secondary'>
                                  <b>
                                    <span className='text-black'>{review.user}</span> says
                                    <span
                                      className={
                                        review.recommendation === 'Recommended' ? 'text-success' : 'text-danger'
                                      }
                                    >
                                      {' '}
                                      {review.recommendation}
                                    </span>
                                  </b>
                                </p>
                                <div className='d-flex '>
                                  <Container className='text-center w-50 ' style={{ wordWrap: 'break-word' }}>
                                    {review.description}
                                  </Container>
                                </div>
                              </Card>
                            </div>
                          </>
                        )}
                        {userInfo && userInfo.username === review.user && (
                          <Button
                            className='mx-auto d-block mt-2'
                            variant='danger'
                            onClick={e => deleteReview(e, review._id)}
                            style={{ fontSize: '14px', padding: '2px 5px' }} // Adjust font size and padding
                          >
                            Delete
                          </Button>
                        )}
                        {deleteStatuses[review._id] === 'Success' && (
                          <div className='text-success'>Review deleted successfully!</div>
                        )}
                        {deleteStatuses[review._id] === 'Error' && (
                          <div className='text-danger'>Error deleting review. Please try again.</div>
                        )}

                        <div className='mt-2 text-center ' key={review._id}>
                          {' '}
                          <button className='border-0 bg-gray  shake' onClick={() => handleVote(review._id, 1)}>
                            {review.thumbsUp}{' '}
                            <span role='img' aria-label='thumbs up'>
                              👍
                            </span>
                          </button>
                          <button className='border-0 bg-gray  shake' onClick={() => handleVote(review._id, 0)}>
                            👎{' '}
                            <span role='img' aria-label='thumbs down'>
                              {review.thumbsDown}
                            </span>
                          </button>
                        </div>
                        <p className='text-center text-secondary'>
                          {/* Posted On:{" "} */}
                          {new Date(review.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          })}
                        </p>

                        <hr />
                      </div>
                    ))}
                </Card>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </Container>
  )
}

export default StationDetails
