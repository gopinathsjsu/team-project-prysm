import React from "react";
import { backend } from "../config";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const SignupForm = () => {
  const [formValue, setformValue] = React.useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    var data = {
      username: formValue.email,
      name: formValue.name,
      password: formValue.password,
      rewards: 10
    };
    console.log(data);
    try {
      // make axios post request
      const response = await axios.post(`${backend}/registerUser`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          name="name"
          placeholder="Enter Name"
          value={formValue.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div className="d-grid gap-2 rounded-circle">
        <Button variant="dark" type="submit" size="md" onClick={handleSubmit}>
          {" "}
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
export default SignupForm;
