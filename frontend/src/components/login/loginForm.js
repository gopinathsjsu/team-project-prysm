import React , {useState} from "react";
import {useDispatch} from 'react-redux'
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { backend } from "../config";
import "./LoginForm.css";
import AdminPage from "./AdminPage";
import { EmmployeeLogin } from "../../store/actions/EmployeeAction";


const LoginForm = ({handleCloseLogin}) => {
  const [formValue, setformValue] = React.useState({
    email: "",
    password: "",
  });
   const styles = {
    card: {
      backgroundColor: "White",
      borderRadius: 55,
      padding: "2rem",
    },
    cardImage: {
      height: "100%",
      objectFit: "cover",
      borderRadius: 15,
    },
  };

  const [loggedIn, setLoggedIn] = useState(false);


  const handleUserLogin = async (event) => {
    var data = {
      username: formValue.email,
      password: formValue.password,
    };
    console.log(data);
    try {
      // make axios post request
      const response = await axios.post(`${backend}/loginUser`, data);
      const userData = response.data;
      console.log(userData);
      if(userData.username){
        handleCloseLogin();
        console.log(localStorage);
        localStorage.setItem('userName',userData.username);  
        localStorage.setItem('Name',userData.name);  
        localStorage.setItem("isLoggedIn" , true);
        localStorage.setItem("isUserLoggedIn", true);
        localStorage.setItem("isEmployeeLoggedIn" , false);
        localStorage.setItem("rewardPoints" , userData.rewards); 
        console.log(userData.rewards);
        if(userData.rewards >= 100){
          localStorage.setItem("isLoyal", true);
        }
      }else{
        console.log("wrong creds");
        localStorage.setItem("isUserLoggedIn", false);
        localStorage.setItem("isLoggedIn" , false);
        window.alert("Please enter correct login credentials")

      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };

  //Employee Login API call 
  const handleEmployeeLogin = async (event) => {
    console.log("employeeLogin");

    var data = {
      username: formValue.email,
      password: formValue.password,
    };
    console.log(data);
    try {
      // make axios post request
      const response = await axios.post(`${backend}/loginEmployee`, data);
      const employeeData = response.data;
      console.log(employeeData);
      if(employeeData.username){
        handleCloseLogin();
        localStorage.setItem('userName',employeeData.username);  
        localStorage.setItem("isLoggedIn" , true);
        localStorage.setItem("isEmployeeLoggedIn" , true);
        localStorage.setItem("isUserLoggedIn" , false);
        localStorage.setItem("EmployeeName" , employeeData.name);
        console.log(localStorage);     
      }else{
        localStorage.setItem("isEmployeeoggedIn", false);
        localStorage.setItem("isLoggedIn" , false);
        window.alert("Please enter correct login credentials")
      }
      }
     catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };


  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
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
      <div className="flex-container">
        <Row>
          <Col md ={"auto"}>
            <Button variant="dark" type="submit" size="md" onClick={handleUserLogin}>
              Customer Login
             </Button>
          </Col>
          <Col md ={"auto"}>
            <Button variant="dark" type="submit" size="md"  onClick={handleEmployeeLogin}>
              Employee Login
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
    </>
  );
};
export default LoginForm;