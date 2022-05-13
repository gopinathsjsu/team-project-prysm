import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "./loginForm";
function LoginButton() {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  //   const [showSignup, setShowSignup] = useState(false);
  //   const handleShowSignup = () => {
  //     setShowLogin(false);
  //     setShowSignup(true);
  //   };
  //   const handleCloseSignup = () => setShowSignup(false);

  return (
    <>
      <div className="d-grid gap-2 rounded-circle">
        <Button variant="light"  onClick={handleShowLogin}>
          Sign in
        </Button>
      </div>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>
            Login
            <div id="registerButton">
              {/* <Button
                variant="outline-dark"
                size="sm"
                onClick={handleShowSignup}
              >
                {" "}
                Register
              </Button> */}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm  handleCloseLogin = {handleCloseLogin} />
        </Modal.Body>
      </Modal>

      {/* <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Create your account </h4>
            <h6>Registartion is easy.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal> */}
    </>
  );
}
// render(<Home />);
export default LoginButton;
