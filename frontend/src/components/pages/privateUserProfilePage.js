import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link, useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import EditUserPage from './editUserPage' // Adjust the import path accordingly

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({})
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()

  // handle logout button
  const handleLogout = async () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  if (!user) {
    return (
      <div className='d-flex align-items-center justify-content-center vh-100'>
        <h4>You must log in to view this page.</h4>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='col-md-12 text-center'>
        <h1>{user && user.username}</h1>
        <div className='col-md-12 text-center'>
          <>
            {/* Use Link to navigate to EditUserPage
            <Link to='/user/editUser' className='btn btn-primary mx-4'>
              Edit User
            </Link> */}
            <div className='container d-flex align-items-center justify-content-center mt-4 mb-4'>
              <EditUserPage />
            </div>

            <Button className='me-2' onClick={handleShow}>
              Log Out
            </Button>
            <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Log Out</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleLogout}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>

      {/* Render EditUserPage component */}
    </div>
  )
}

export default PrivateUserProfile 
