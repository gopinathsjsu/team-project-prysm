import React, { useState } from "react";
import axios from "axios";
import { backend } from "./config";
import DatePicker from "react-datepicker";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import { pink } from "@mui/material/colors";
import {
  Table,
  Container,
  CardGroup,
  Card,
  Row,
  Col,
  Button,
  Modal,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import hotelImage from "./trip2.jpg";
const styles = {
  card: {
    backgroundColor: "White",
    borderRadius: 55,
    padding: "2rem",
    height: "430px",
  },
  cardImage: {
    height: "70%",
    objectFit: "cover",
    borderRadius: 15,
  },
};

export const MyTrips = () => {
  const [tripData, setTripData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showToastFailed, setShowToastFailed] = useState(false);
  React.useEffect(() => {
    let fetchData = async () => {
      let customerID = localStorage.getItem("userName");
      console.log(customerID);
      const response = await axios.get(`${backend}/fetchCustomerHistory/`, {
        params: { customerId: customerID },
      });
      console.log(JSON.stringify(response.data) + " useEffect");
      setTripData(response.data);
    };
    fetchData();
  }, []);
  const handleCloseModal = () => setShowModal(false);
  const handleUpdateBooking = (bookingId) => {
    setShowModal(true);
    setBookingId(bookingId);
  };
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };
  const handleSaveChanges = async () => {
    var data = {
      bookingId: bookingId,
      fromDate: checkInDate.toISOString().substring(0, 10),
      toDate: checkOutDate.toISOString().substring(0, 10),
    };
    console.log(data);
    const response = await axios.post(`${backend}/updateReservation`, data);
    console.log(response);
    if (response.data) {
      window.location.href = "/myTrips";
      setTimeout(() => {}, 1000);
      setShowModal(false);
      setShowToast(true);
    } else {
      setShowModal(false);
      setShowToastFailed(true);
    }
  };
  const handleCancel = async (bookingId) => {
    console.log(bookingId);
    var data = {
      booking_id: bookingId,
    };
    try {
      const response = await axios.post(`${backend}/cancelReservation`, data);
      console.log(response);
      if (response.data) {
        setShowToast(true);

        const customerID = localStorage.getItem("userName");

        const res = await axios.get(`${backend}/getCustomerRewards/`, {
          params: { customer_id: customerID },
        });
        console.log(res.data);
        localStorage.setItem("rewardPoints", res.data);
        window.location.href = "/myTrips";
      } else {
        setShowToastFailed(true);
      }
    } catch (error) {}
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
                  <Card.Img src={hotelImage} style={styles.cardImage} />
                </Col>
                <Col>
                  <Card.Header as="h3">{data.hotel_name}</Card.Header>
                  <Card.Body>
                    <Card.Title as="h3"></Card.Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Room type : {data.roomType}</td>
                          <td> Price : {data.totalPrice} $</td>
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
                  <br />
                  <br />
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleUpdateBooking(data.bookingId);
                    }}
                  >
                    Update Booking
                  </Button>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;&nbsp;
                  <Button
                    variant="outline-danger"
                    onClick={() => handleCancel(data.bookingId)}
                  >
                    Cancel Booking
                  </Button>
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
          <Button
            variant="outline-primary"
            size="md"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <DoneAllRoundedIcon color="success" />
            Operation Successful!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={() => setShowToastFailed(false)}
          show={showToastFailed}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <SmsFailedIcon sx={{ color: pink[500] }} /> Failed! Cannot change or
            cancel past/present dates booking!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
