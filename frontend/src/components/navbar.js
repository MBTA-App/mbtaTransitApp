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
    <ReactNavbar
      bg="dark"
      variant="dark"
      style={{
        position: "fixed",
        top: "0%",
        left: 0,
        height: "100vh",
        width: "10%", // Adjust the width as needed
        zIndex: "100%", // Ensure it's above other content
      }}
    >
      <Container>
        <Nav className="flex-column" style={{ marginBottom: "175%" }}>
          <Nav.Link
            href="/home"
            style={{
              marginBottom: "70%",
              marginTop: "300%",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "120%",
              marginLeft: "2%",
            }}
          >
            <i>Home</i>
          </Nav.Link>
          <Nav.Link
            href="/mbtaTracker"
            style={{
              marginBottom: "70%",
              marginTop: "40%",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "120%",
              marginLeft: "-2%"
            }}
          >
            <i>MBTA Tracker</i>
          </Nav.Link>
          <Nav.Link
            href="/mbtaAlert"
            style={{
              marginBottom: "70%",
              marginTop: "40%",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "120%",
              marginLeft: "-2%",
            }}
          >
            <i>MBTA Alerts</i>
          </Nav.Link>
          <Nav.Link
            href="/mbtaStation"
            style={{
              marginBottom: "70%",
              marginTop: "40%",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "115%",
              marginLeft: "-2%"
            }}
          >
            <i>MBTA Stations</i>
          </Nav.Link>
          <NavDropdown
            title={<BsPerson size="40" />}
            id="basic-nav-dropdown"
            style={{ position: "absolute", top: "1%", left: 0 }}
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/privateUserProfile">
              <Nav.Link href="/home" style={{ marginTop: "-25%" }}>
                Home
              </Nav.Link>
              Settings
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
