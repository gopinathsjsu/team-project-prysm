import { React, useEffect, useState } from "react";

import "../styles/Header.css";

import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";
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
              <Row xs={'auto'}>
                <Col>
                  <Nav.Link href="home">Home</Nav.Link>
                </Col>
                <Col>
                {
                  !flag && (
                    <NavDropdown title="Sign In" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <LoginButton />
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <SignUpButton />
                      </NavDropdown.Item>
                   </NavDropdown>
                  )
                }
                </Col>
                <Col>
                   {flag && <SignOutButton />}
                </Col>
                <Col>
                   {flag &&  <Nav.Link href="myTrips">My Trips</Nav.Link>}
                </Col>
            </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
