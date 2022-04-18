import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const LoginForm = () => {
  const [formValue, setformValue] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    var data = {
      username: formValue.email,
      password: formValue.password,
    };
    console.log(data);
    try {
      // make axios post request
      const response = await axios.post(
        "http://localhost:8080/loginUser",
        data
      );
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
          Login
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
