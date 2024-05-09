/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import getUserInfo from '../../utilities/decodeJwt'

const Landingpage = () => {
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
      <Container fluid>
        <Col xs={18} sm={16} md={12} lg={15} style={{ padding: '1%' }}>
          <Card className=' mb-4 text-center rounded shadow ' style={{ backgroundColor: '#165c96' }}>
            <header className='jumbotron '>
              <div className='container'>
                <h1 className='display-1 ' style={{ fontWeight: 'bold', color: 'orange' }}>
                  MBTAXpress
                </h1>
              </div>
              <h2
                className='mt-4 rounded-pill text-center text-white p-4 d-flex justify-content-center '
                style={{ backgroundColor: '#165c96', width: '100%' }}
              >
                Welcome back,&nbsp;
                <span style={{ color: 'orange', fontWeight: 'bold' }}>{user.username}</span>
              </h2>
            </header>
          </Card>
        </Col>
        <div>
          <div className='d-flex justify-content-center align-items-center text-center mt-lg-5 mt-md-3 mt-sm-2 mt-1'>
            <div className='d-flex justify-content-center align-items-center text-center text-md-center px-4 '>
              <div className='card-body p-4'>
                <div className='row'>
                  <div className='col-sm-4'>
                    <img
                      src='/mapImage.jpeg'
                      alt='Live Tracking Image'
                      className='img-fluid mb-3'
                      style={{
                        maxHeight: '240px', // Adjust the maximum height of the image
                        width: '60%',
                        objectFit: 'cover',
                      }}
                    />
                    <h5 className='display-5'>Experience Live Tracking</h5> {/* Adjust text size */}
                    <p className='small'>View live tracking of any train, tram, subway, or bus</p>{' '}
                    {/* Use small text size */}
                  </div>
                  <div className='col-sm-4'>
                    <img
                      src='/alertsImage.png'
                      alt='Live Tracking Image'
                      className='img-fluid mb-3'
                      style={{
                        maxHeight: '240px', // Adjust the maximum height of the image
                        width: '70%',
                        objectFit: 'cover',
                      }}
                    />
                    <h5 className='display-5'>Stay up to date with alerts</h5> {/* Adjust text size */}
                    <p className='small'>Keep up with any delays or service changes</p> {/* Use small text size */}
                  </div>
                  <div className='col-sm-4'>
                    <img
                      src='/ratingImage.png'
                      alt='Live Tracking Image'
                      className='img-fluid mb-3'
                      style={{
                        maxHeight: '240px', // Adjust the maximum height of the image
                        width: '40%',
                        objectFit: 'cover',
                      }}
                    />
                    <h5 className='display-5 mt-2'>Review and Rate stations</h5> {/* Adjust text size */}
                    <p className='small'>Check out your commuter community.</p>{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>{' '}
          <Container className='d-flex justify-content-center'>
            <div className='mb-5'>
              <Card.Body>
                <Card.Title className='text-center rfs-20 fw-bolder  mt-4'>
                  <div>
                    <Button className='bg-danger' onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>{' '}
                </Card.Title>
              </Card.Body>
            </div>
          </Container>
        </div>{' '}
      </Container>
    )
  }
  if (!user) {
    return (
      <Container fluid>
        <Col xs={18} sm={16} md={12} lg={15} style={{ padding: '1%' }}>
          <Card className=' mb-4 text-center rounded shadow mt-4 mt-md-0 ' style={{ backgroundColor: '#165c96' }}>
            <header className='jumbotron '>
              <div className='container'>
                <h1 className='display-1' style={{ fontWeight: 'bold' }}>
                  <span style={{ color: 'white' }}>MBTA</span>
                  <span style={{ color: 'orange' }}>Xpress</span>
                </h1>
              </div>
              <Container className='justify-content-center d-flex mb-4' style={{ marginTop: '2rem' }}>
                <div className='col'>
                  <Card.Text>
                    <a
                      href='/login'
                      className='btn'
                      style={{ fontSize: '1.5em', padding: '5px 10px', color: 'white', backgroundColor: 'orange' }}
                    >
                      Sign In
                    </a>
                  </Card.Text>
                </div>
                <div className='col'>
                  <Card.Text>
                    <a
                      href='/signup'
                      className='btn '
                      style={{ fontSize: '1.5em', padding: '5px 10px', color: 'white', backgroundColor: 'orange' }}
                    >
                      Sign Up
                    </a>
                  </Card.Text>
                </div>
              </Container>
            </header>
          </Card>
        </Col>
        <Container className='d-flex flex-column align-items-center justify-content-center'>
          {/* Welcome Card */}
          <Col xs={12} sm={16} md={6} lg={15} style={{ padding: '1%' }}>
            <Container
              style={{ width: '100%', height: '100%', backgroundColor: '#165c96' }}
              className='text-center shadow-xl rounded-pill border'
            >
              <div className='text-center d-flex flex-column align-items-center justify-content-center'></div>
            </Container>
          </Col>
        </Container>
        <Container className='d-flex mt-4 justify-content-center align-items-center text-center text-md-center px-4 '>
          <Col md={15}>
            <div className='card-body p-4'>
              <div className='row'>
                <div className='col-sm-4'>
                  <img
                    src='/mapImage.jpeg'
                    alt='Live Tracking Image'
                    className='img-fluid mb-3'
                    style={{
                      maxHeight: '240px', // Adjust the maximum height of the image
                      width: '60%',
                      objectFit: 'cover',
                    }}
                  />
                  <h5 className='display-5'>Experience Live Tracking</h5> {/* Adjust text size */}
                  <p className='small'>View live tracking of any train, tram, subway, or bus</p>{' '}
                  {/* Use small text size */}
                </div>
                <div className='col-sm-4'>
                  <img
                    src='/alertsImage.png'
                    alt='Live Tracking Image'
                    className='img-fluid mb-3'
                    style={{
                      maxHeight: '240px', // Adjust the maximum height of the image
                      width: '70%',
                      objectFit: 'cover',
                    }}
                  />
                  <h5 className='display-5'>Stay up to date with alerts</h5> {/* Adjust text size */}
                  <p className='small'>Keep up with any delays or service changes</p> {/* Use small text size */}
                </div>
                <div className='col-sm-4'>
                  <img
                    src='/ratingImage.png'
                    alt='Live Tracking Image'
                    className='img-fluid mb-3'
                    style={{
                      maxHeight: '240px', // Adjust the maximum height of the image
                      width: '40%',
                      objectFit: 'cover',
                    }}
                  />
                  <h5 className='display-5 mt-2'>Review and Rate stations</h5> {/* Adjust text size */}
                  <p className='small'>Check out your commuter community.</p>{' '}
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </Container>
    )
  }
}

export default Landingpage
