import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsPerson } from "react-icons/bs"; // Import the BsPerson icon from react-icons/bs

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled:
  // eslint-disable-next-line
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="align-content-end mr-auto">
          {/* <Nav.Link href='/'>Start</Nav.Link> */}
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/mbtaTracker">MBTA Tracker</Nav.Link>
          <Nav.Link href="/mbtaAlert">MBTA Alerts</Nav.Link>
          <Nav.Link href="/mbtaRoutes">MBTA Routes</Nav.Link>
          <Nav.Link href="/mbtaStation">MBTA Stations</Nav.Link>

          <NavDropdown
            className=""
            title={
              <span>
                <BsPerson size="25" />
              </span>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/privateUserProfile">
              Settings
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
