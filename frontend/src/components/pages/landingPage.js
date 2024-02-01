import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Landingpage = () => {
  const continueWithoutSignIn = () => {
    // Add your logic for continuing without signing in
    console.log('Continue without signing in')
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card style={{ width: '50%', height: '50%' }} className='text-center bg-dark shadow-xl rounded border'>
        <Card.Body className='text-center d-flex flex-column align-items-center justify-content-center'>
          <Card.Title>MBTA Transit App</Card.Title>
          <Card.Subtitle className='mb-2 text-white display-5 '>Welcome</Card.Subtitle>
          <Card.Text className='mt-4'>
            <a href='/login' className='btn btn-primary mx-4'>
              Login
            </a>
          </Card.Text>
          <Card.Text>
            <a href='/signup' className='btn btn-primary mx-4'>
              Sign Up
            </a>
          </Card.Text>
          <Button href='#' variant='link' className='mt-3' onClick={continueWithoutSignIn}>
            Continue without signing in
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Landingpage
