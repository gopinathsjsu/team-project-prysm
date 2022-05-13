import { React, useEffect, useState } from "react";

import "../styles/Header.css";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginButton from "./login/loginModal";
import SignUpButton from "./signup/SignUpModal";
import SignOutButton from "./signOut/SignOutButton";

function NavBar() {
  const [flag, setFlag] = useState();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [flag]);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand href="#home">PRYSM HOTELS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="home">Home</Nav.Link>
              <NavDropdown title="Sign In" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <LoginButton />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <SignUpButton />
                </NavDropdown.Item>
              </NavDropdown>

              {/* <Nav.Link href="/Link">Sign out</Nav.Link> */}
              {flag && <SignOutButton />}
              <Nav.Link href="myTrips">My Trips</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
