import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import getUserInfo from '../../utilities/decodeJwt'

const Landingpage = () => {
  const continueWithoutSignIn = () => {
    // Add your logic for continuing without signing in
    console.log('Continue without signing in')
  }
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  const handleLogout = async () => {
    localStorage.clear()
    navigate('/')
  }

  if (user) {
    return (
      <div>
        <div>
          <div>
            <h1 className='align-content-center justify-content-center d-flex mt-4'>MBTAXpress</h1>
          </div>
          {/* Welcome Card */}={' '}
          <Container
            style={{ marginTop: '26rem' }}
            className='d-flex justify-content-centerrow text-center text-md-center'
          >
            <div class='card-body'>
              <div class='row'>
                <div class='col-sm-4 '>
                  <h5 className='display-4'>Experience Live Tracking</h5>
                  <p>View live tracking of any train, tram, subway, or bus</p>
                </div>
                <div class='col-sm-4'>
                  <h5 className='display-4'>Stay up to date with alerts</h5>
                  <p>Keep up with an delays or service changes</p>
                </div>
                <div class='col-sm-4'>
                  <h5 className='display-4'>Review and Rate stations</h5>
                  <p>Check out your commuter community.</p>
                </div>
              </div>
            </div>
          </Container>
          ={' '}
          <Container style={{ marginTop: '6rem' }} className='d-flex justify-content-center'>
            <div className='mb-5'>
              <Card.Body>
                <Card.Title className='text-center rfs-20 fw-bolder'>
                  <div>
                    <div className='mt-4'>
                      <h2>You are logged in.</h2>
                    </div>
                    <div>
                      <Button onClick={handleLogout}>Logout</Button>
                    </div>
                  </div>{' '}
                </Card.Title>
              </Card.Body>
            </div>
          </Container>
        </div>{' '}
      </div>
    )
  }
  if (!user) {
    return (
      <div>
        <div>
          <h1 className='justify-content-center d-flex mt-4 ml-4 display-1 fw-bolder'>MBTAXpress</h1>
        </div>
        <Container className='d-flex flex-column align-items-center justify-content-center vh-100'>
          {/* Welcome Card */}
          <div style={{ width: '50%', height: '20%' }} className='text-center shadow-xl rounded border bg-dark'>
            <div className='text-center d-flex flex-column align-items-center justify-content-center'>
              <Card.Subtitle className='mb-2 mt-4 text-white display-5 '>Welcome</Card.Subtitle>
              <Container className='row text-center text-md-center mt-4'>
                <div className='col'>
                  <Card.Text className=''>
                    <a
                      href='/login'
                      className='btn btn-primary mx-4'
                      style={{ fontSize: '1.5em', padding: '10px 20px' }}
                    >
                      Login
                    </a>
                  </Card.Text>
                </div>
                <div className='col'>
                  <Card.Text>
                    <a
                      href='/signup'
                      className='btn btn-primary mx-6'
                      style={{ fontSize: '1.5em', padding: '10px 20px' }}
                    >
                      Sign Up
                    </a>
                  </Card.Text>
                </div>
              </Container>
              {/* <Button href='#' variant='link' className='mt-3' onClick={continueWithoutSignIn}>
                Continue without signing in
              </Button> */}
            </div>
          </div>
          <Container className='py-md-6 py-4'>
            <Card className='border-0'>
              {/* Lorem Ipsum Content */}
              <div className='mb-2 mt-4'>
                <Card.Body>
                  <Card.Title className='text-center display-6 rfs-20 fw-semibold'>Join MBTAXpress Today </Card.Title>
                </Card.Body>
              </div>
              <Container className='row text-center text-md-center'>
                <div className='col-md-6 mb-4'>
                  <Card.Body>
                    <Card.Text className='lead display-4'>Experience live tracking.&nbsp;</Card.Text>
                  </Card.Body>
                </div>
                <div className='col-md-6 mb-4'>
                  <Card.Body>
                    <Card.Text className='lead display-4'>Join a community of commuters.&nbsp;</Card.Text>
                  </Card.Body>
                </div>
              </Container>
            </Card>
          </Container>
        </Container>
      </div>
    )
  }
}

export default Landingpage
