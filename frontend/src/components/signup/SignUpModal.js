import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import SignUpForm from "./SignUpForm";
function SignUpButton() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  return (
    <>
      <div className="d-grid gap-2 rounded-circle">
        <Button variant="light" onClick={handleShowSignUp}>
          Sign Up
        </Button>
      </div>

      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>
            Sign Up
            <div id="registerButton"></div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm handleCloseSignUp = {handleCloseSignUp}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
// render(<Home />);
export default SignUpButton;
