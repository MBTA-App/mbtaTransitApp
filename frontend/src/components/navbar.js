import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import ReactNavbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { BsPerson } from 'react-icons/bs'

export default function Navbar() {
  return (
    <>
      <ReactNavbar
        variant='dark'
        className='d-none d-sm-block ' // Hidden on extra small screens (mobile)
        style={{
          minWidth: '7rem',
          maxWidth: '1rem',
          backgroundColor: '#165c96',
          height: '100vh',
          width: '10%', // Adjust the width as needed
          position: 'sticky',
          top: 0,
        }}
      >
        <Container>
          <Nav className='flex-column'>
            <Nav.Link
              href='/home'
              style={{
                color: '#FFFFFF',
                marginBottom: '70%',
                marginTop: '300%',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '120%',
                marginLeft: '5%',
              }}
            >
              <i>Home</i>
            </Nav.Link>
            <Nav.Link
              href='/mbtaTracker'
              style={{
                color: '#FFFFFF',
                marginBottom: '70%',
                marginTop: '40%',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '120%',
                marginLeft: '-2%',
              }}
            >
              <i>MBTA Tracker</i>
            </Nav.Link>
            <Nav.Link
              href='/mbtaAlert'
              style={{
                color: '#F5F5F5',
                marginBottom: '70%',
                marginTop: '40%',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '120%',
                marginLeft: '-2%',
              }}
            >
              <i>MBTA Alerts</i>
            </Nav.Link>
            <Nav.Link
              href='/mbtaStation'
              style={{
                color: '#F5F5F5',
                marginBottom: '70%',
                marginTop: '40%',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '115%',
                marginLeft: '-2%',
              }}
            >
              <i>MBTA Stations</i>
            </Nav.Link>
            <NavDropdown
              title={<BsPerson size='50' />}
              id='basic-nav-dropdown'
              style={{
                color: '#F5F5F5',
                position: 'absolute',
                top: '1%',
                left: '13%',
              }}
            >
              <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
              <NavDropdown.Item href='/privateUserProfile'>
                {/* <Nav.Link href='/home' style={{ marginTop: '-25%' }}>
      Home
    </Nav.Link> */}
                Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </ReactNavbar>

      <ReactNavbar
        variant='dark'
        className='d-block d-sm-none d-flex justify-content-center align-items-center '
        style={{
          backgroundColor: '#165c96',
          height: '54px', // Adjust height as needed for mobile navbar
          position: 'sticky',
          top: 0,
          zIndex: 5,
        }}
      >
        <Nav className='text-center justify-content-center d-flex align-items-center ' style={{ width: '100%' }}>
          <Nav.Link href='/home' style={{ color: '#FFFFFF' }}>
            Home
          </Nav.Link>
          <Nav.Link href='/mbtaTracker' style={{ color: '#FFFFFF' }}>
            MBTA Tracker
          </Nav.Link>
          <Nav.Link href='/mbtaAlert' style={{ color: '#FFFFFF' }}>
            MBTA Alerts
          </Nav.Link>
          <Nav.Link href='/mbtaStation' style={{ color: '#FFFFFF' }}>
            MBTA Stations
          </Nav.Link>
          <NavDropdown
            title={<BsPerson size='30' />}
            align={'end'}
            id='basic-nav-dropdown'
            style={{ color: '#F5F5F5' }}
          >
            <div className='text-center'>
              <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
              <NavDropdown.Item href='/privateUserProfile'>Settings</NavDropdown.Item>
            </div>
          </NavDropdown>
        </Nav>
      </ReactNavbar>
    </>
  )
}
