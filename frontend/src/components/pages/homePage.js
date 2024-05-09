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
  const handleLogout = async () => {
    localStorage.clear()
    navigate('/')
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
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Card className='p-4' style={{ maxWidth: '30rem', backgroundColor: '#FFEB99' }}>
        <Card.Body>
          <>
            <div>
              <h3 className='text-center mb-4'>
                Welcome
                <span className='username'> @{username}</span>
              </h3>
              <h3 className='text-center mb-4'>
                <i>MongoDB UserID:</i>
                <p></p>
                <span className='userId'>{id}</span>
              </h3>
              <h3 className='text-center mb-4'>
                <i>Registered Email:</i> <p></p>
                <span className='email'>{email}</span>
              </h3>
              <h3 className='text-center mb-4' style={{ fontSize: '24px' }}>
                Password:
                <div>
                  <span className='password'>{password} (hashed)</span>
                </div>
              </h3>
            </div>
            <div className='text-center mt-4'>
              <button
                onClick={e => handleClick(e)}
                style={{
                  backgroundColor: '#354F6B',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Log Out
              </button>
            </div>
          </>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default HomePage
