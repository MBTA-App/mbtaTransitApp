import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const PRIMARY_COLOR = 'red'
const SECONDARY_COLOR = '#0c0c1f'
const url = 'http://localhost:8081/user/signup'
const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR)
  
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  
  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: '2px 2px 4px #000000'
  }
  let backgroundStyling = { 
    background: bgColor,
    backgroundImage: 'url(https://bdc2020.o0bc.com/wp-content/uploads/2019/09/orangelinecar-768x432.jpeg?width=800)', // Add your image URL here
    backgroundSize: 'cover', // This will make sure the image covers the whole page
    backgroundPosition: 'center', // This will center the image
  }
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: 'none',
    color: bgColor,
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let audio = new Audio('mixkit-train-door-close-1638.wav'); 
      audio.play()
      const { data: res } = await axios.post(url, data)
      const { accessToken } = res
      //store token in localStorage
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }

  return (
    <>
      <section className='vh-100'>
        <div className='container-fluid h-custom vh-100'>
          <div className='row d-flex justify-content-center align-items-center h-100 ' style={backgroundStyling}>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label style={labelStyling}>Username</Form.Label>
                  <Form.Control type='username' name='username' onChange={handleChange} placeholder='Enter username' />
                  <Form.Text className='text-muted'>We just might sell your data</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label style={labelStyling}>Email</Form.Label>
                  <Form.Control type='email' name='email' onChange={handleChange} placeholder='Enter Email Please' />
                  <Form.Text className='text-muted'>We just might sell your data</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} />
                </Form.Group>
                {error && (
                  <div style={labelStyling} className='pt-3'>
                    {error}
                  </div>
                )}
                <Button variant='primary' type='submit' onClick={handleSubmit} style={buttonStyling} className='mt-2'>
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register