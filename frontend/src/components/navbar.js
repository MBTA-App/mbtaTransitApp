import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsPerson } from "react-icons/bs";

export default function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/mbtaTracker">MBTA Tracker</Nav.Link>
          <Nav.Link href="/mbtaAlert">MBTA Alerts</Nav.Link>
          <Nav.Link href="/mbtaStation">MBTA Stations</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
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
