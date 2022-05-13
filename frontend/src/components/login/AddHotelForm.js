import React, {useState}from 'react';
import { backend } from "../config";
import {
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";
import axios from "axios";

const AddHotelForm = (props) => {
    const [formValue, setformValue] = useState({
        hotel_id: "",
        hotel_name: "",
        country: "",
        city: "",
        daily_continental_breakfast: false,
        fitness_room: false,
        swimming_pool: false,
        jacuzzi: false,
        daily_parking: false,
        all_meals: false
    });

    const handleChange = (event) => {
      setformValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
  };
    const handleAddHotelSubmit = async (event)=>{
      event.preventDefault();
      let data = {
        hotel_id: formValue.hotel_id,
        hotel_name: formValue.hotel_name,
        country: formValue.country,
        city: formValue.city,
        daily_continental_breakfast: formValue.daily_continental_breakfast,
        fitness_room: formValue.fitness_room,
        swimming_pool: formValue.swimming_pool,
        jacuzzi: formValue.jacuzzi,
        daily_parking: formValue.daily_parking,
        all_meals: formValue.all_meals
    };
    console.log(data);
      try {
        const response = await axios.post(`${backend}/addHotel`, data);
        console.log(response);
        if(response.data === 'Success'){
          console.log('Hotel added');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    return (
        <Form onSubmit={handleAddHotelSubmit}>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Hotel ID
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="hotel_id"
                  type="text"
                  placeholder="ID"
                  onChange={handleChange}
                  value={formValue.hotel_id}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Hotel Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="hotel_name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  value={formValue.hotel_name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Country
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="country"
                  type="text"
                  placeholder="Country"
                  onChange={handleChange}
                  value={formValue.country}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                City
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="city"
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  value={formValue.city}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Daily Continental Breakfast
              </Form.Label>
              <Col sm={8}>
                  <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="1">True</option>
                        <option value="2">False</option>
                  </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Fitness Room
              </Form.Label>
              <Col sm={8}>
                 <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="1">True</option>
                        <option value="2">False</option>
                  </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Swimming Pool
              </Form.Label>
              <Col sm={8}>
                  <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="1">True</option>
                        <option value="2">False</option>
                  </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Jacuzzi
              </Form.Label>
              <Col sm={8}>
                  <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="1">True</option>
                        <option value="2">False</option>
                  </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Daily Parking
              </Form.Label>
              <Col sm={8}>
                  <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="1">True</option>
                        <option value="2">False</option>
                  </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                All Meals
              </Form.Label>
              <Col sm={8}>
                  <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="1">True</option>
                        <option value="2">False</option>
                  </Form.Select>
              </Col>
            </Form.Group>
            <br />
            <Button variant="dark" type="submit" >
              Submit
            </Button>
            &nbsp;
          </Form>

    )
}

export default AddHotelForm