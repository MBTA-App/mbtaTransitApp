import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import { Card, Container } from 'react-bootstrap'
const HomePage = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const handleClick = e => {
    e.preventDefault()
    localStorage.removeItem('accessToken')
    return navigate('/')
  }

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  if (!user)
    return (
      <div className='d-flex align-items-center justify-content-center vh-100'>
        <h4>Log in to view this page.</h4>
      </div>
    )
  const { id, email, username, password } = user
  return (
    <Container>
      <Card className='d-flex align-items-center justify-items-center p-4 m-4'>
        <Card.Body>
          <>
            <div>
              <h3 className='text-center mb-4'>
                Welcome
                <span className='username'> @{username}</span>
              </h3>
              <h3>
                Your userId in mongo db is
                <span className='userId'> {id}</span>
              </h3>
              <h3>
                Your registered email is
                <span className='email'> {email}</span>
              </h3>
              <h3>
                Your password is
                <div>
                  <span className='password'> {password} ( hashed )</span>
                </div>
              </h3>
            </div>
            <div className='text-center mt-4'>
              <button onClick={e => handleClick(e)}>Log Out</button>
            </div>
          </>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default HomePage
