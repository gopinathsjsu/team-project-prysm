import React, { useState } from "react";
import axios from "axios";
import { backend } from "./config";
import DatePicker from "react-datepicker";
import {
  Table,
  Container,
  CardGroup,
  Card,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
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

export const MyTrips = () => {
  const [tripData, setTripData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  React.useEffect(() => {
    let fetchData = async () => {
      let customerID = "202@gmail.com";
      const response = await axios.get(`${backend}/fetchCustomerHistory/`, {
        params: { customerId: customerID },
      });
      console.log(JSON.stringify(response.data) + " useEffect");
      setTripData(response.data);
    };
    fetchData();
  }, []);
  const handleCloseModal = () => setShowModal(false);
  const handleUpdateBooking = () => {
    setShowModal(true);
  };
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };
  let responseData;
  if (tripData) {
    responseData = React.Children.toArray(
      tripData.map((data) => (
        <Container fluid className="text-center">
          <CardGroup className="m-5 d-block">
            <Card className="m-5 border-0 shadow" style={styles.card}>
              <Row>
                <Col>
                  <Card.Img src="Image" style={styles.cardImage} />
                </Col>
                <Col>
                  <Card.Header as="h3">{data.hotelId}</Card.Header>
                  <Card.Body>
                    <Card.Title as="h3"></Card.Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Room type : {data.roomType}</td>
                          <td> Price : {data.totalPrice}</td>
                          <td> </td>
                        </tr>
                        <tr>
                          <td>From Date : {data.fromDate}</td>
                          <td>To Date : {data.toDate}</td>
                          <td></td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                  <Button
                    variant="outline-primary"
                    onClick={handleUpdateBooking}
                  >
                    Update Booking
                  </Button>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;&nbsp;
                  <Button variant="outline-danger">Cancel Booking</Button>
                </Col>
              </Row>
            </Card>
          </CardGroup>
        </Container>
      ))
    );
  }
  return (
    <>
      <br />
      <h3 style={{ textAlign: "center" }}>My Trips</h3>
      {responseData}
      <Modal size="md" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title aria-labelledby="contained-modal-title-vcenter" centered>
            Update Booking Dates <span style={{ textAlign: "right" }}></span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="App">
            <div className="input-container">
              <div>
                <label>Check-in</label>
                <DatePicker
                  selected={checkInDate}
                  minDate={new Date()}
                  onChange={handleCheckInDate}
                />
              </div>
              <div>
                <label>Check-out</label>
                <DatePicker
                  selected={checkOutDate}
                  minDate={checkInDate}
                  onChange={handleCheckOutDate}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" size="md">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
