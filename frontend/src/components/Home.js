import React, { useState } from "react";
import "../styles/Header.css";
import {useSelector} from 'react-redux'
import {
  Table,
  Container,
  CardGroup,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import roomImage from "./Room1.jpg";

import { MDBInput } from "mdbreact";

import CountrySelect from "./search/CountrySelect";
import CitySelect from "./search/CitySelect";
import "./Home.css";
import FromDate from "./search/FromDatePicker";
import { pink } from "@mui/material/colors";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { backend } from "./config";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import {
  fromPrices,
  initPrices,
  resetPrice,
} from "../store/actions/roomPriceActions";


import AdminPage from "./login/AdminPage";

function Home() {

  const [hotelData, sethotelData] = useState([]);
  const [RoomData, setRoomData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { searchReducer} = useSelector((state) => state);
  const [flagRooms, setflagRooms] = useState(false);
  const [amenities, setAmenities] = useState({
    AllMeals: false,
    Breakfast: false,
    Jacuzzi: false,
    DailyParking: false,
    SwimmingPool: false,
    FitnessRoom: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [showToastFailed, setShowToastFailed] = useState(false);
  const { roomPriceReducer } = useSelector((state) => state);
  const [totalPrice, setTotalPrice] = useState(0);
  const [singleRoom, setSingleRoom] = useState(false);
  const [doubleRoom, setDoubleRoom] = useState(false);
  const [suiteRoom, setSuiteRoom] = useState(false);
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
  const handleCloseModal = () => {
    setShowModal(false);
    props.resetPrice();
    setTotalPrice(0);
  };

  const searchReduxData = searchReducer.searchReducer;
  const roompriceRedux = roomPriceReducer.roomPriceReducer;
  const bookPriceRedux = bookingPriceReducer.bookingPriceReducer;
  const handleRoomCount = (e) => {
    setAmenities({
      ...amenities,
    });
    var check = {
      roomType: e.target.name,
      amenityBool: e.target.value,
    };
    console.log(e);
    props.fromPrices(check);
  };
  const handleCheck = (e) => {
    setAmenities({
      ...amenities,
      [e.target.name]: e.target.checked,
    });
    var check = {
      roomType: e.target.name,
      amenityBool: e.target.checked,
    };
    props.fromPrices(check);
  };
  const handleSelectRoom = (e) => {
    if (e.target.name === "single" && e.target.checked) {
      setTotalPrice(totalPrice + roompriceRedux.SINGLE_BEDROOM);
      setSingleRoom(true);
    } else if (e.target.name === "double" && e.target.checked) {
      setTotalPrice(totalPrice + roompriceRedux.DOUBLE_BEDROOM);
      setDoubleRoom(true);
    } else if (e.target.name === "suite" && e.target.checked) {
      setTotalPrice(totalPrice + roompriceRedux.SUITE_BEDROOM);
      setSuiteRoom(true);
    } else if (e.target.name === "single" && !e.target.checked) {
      setTotalPrice(totalPrice - roompriceRedux.SINGLE_BEDROOM);
      setSingleRoom(false);
    } else if (e.target.name === "double" && !e.target.checked) {
      setTotalPrice(totalPrice - roompriceRedux.DOUBLE_BEDROOM);
      setDoubleRoom(false);
    } else if (e.target.name === "suite" && !e.target.checked) {
      setTotalPrice(totalPrice - roompriceRedux.SUITE_BEDROOM);
      setSuiteRoom(false);
    }
  };
  const handleOnClick = async () => {
    if (
      searchReduxData.COUNTRY_INFO &&
      searchReduxData.CITY_INFO &&
      searchReduxData.FROM_DATE &&
      searchReduxData.TO_DATE &&
      searchReduxData.ROOMS &&
      searchReduxData.GUESTS
    ) {
      if (searchReduxData.TO_DATE >= searchReduxData.FROM_DATE) {
        var data = {
          country: searchReduxData.COUNTRY_INFO,
          city: searchReduxData.CITY_INFO,
          fromDate: searchReduxData.FROM_DATE.toISOString().substring(0, 10),
          toDate: searchReduxData.TO_DATE.toISOString().substring(0, 10),
          numOfRooms: searchReduxData.ROOMS,
          numOfGuests: searchReduxData.GUESTS,
        };
        try {
          const response = await axios.post(`${backend}/fetchHotels`, data);

          sethotelData(response.data);
          setFlag(true);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleBooking = async () => {
    let data = [
      {
        amenities: {
          daily_continental_breakfast: bookPriceRedux.singleBedroom.breakFast,
          fitness_room: bookPriceRedux.singleBedroom.fitnessRoom,
          swimming_pool: bookPriceRedux.singleBedroom.swimmingPool,
          jacuzzi: bookPriceRedux.singleBedroom.jaccuzzi,
          daily_parking: bookPriceRedux.singleBedroom.dailyParking,
          all_meals: bookPriceRedux.singleBedroom.allMeals,
        },
        room_type: "single",
        count_of_rooms: bookPriceRedux.singleBedroom.roomCount,
        price: roompriceRedux.SINGLE_BEDROOM,
        hotel_id: hotelData.hotel_id,
      },
      {
        amenities: {
          daily_continental_breakfast: bookPriceRedux.doubleBedroom.breakFast,
          fitness_room: bookPriceRedux.doubleBedroom.fitnessRoom,
          swimming_pool: bookPriceRedux.doubleBedroom.swimmingPool,
          jacuzzi: bookPriceRedux.doubleBedroom.jaccuzzi,
          daily_parking: bookPriceRedux.doubleBedroom.dailyParking,
          all_meals: bookPriceRedux.doubleBedroom.allMeals,
        },
        room_type: "double",
        count_of_rooms: bookPriceRedux.doubleBedroom.roomCount,
        price: roompriceRedux.DOUBLE_BEDROOM,
        hotel_id: hotelData.hotel_id,
      },
      {
        amenities: {
          daily_continental_breakfast: bookPriceRedux.suiteBedroom.breakFast,
          fitness_room: bookPriceRedux.suiteBedroom.fitnessRoom,
          swimming_pool: bookPriceRedux.suiteBedroom.swimmingPool,
          jacuzzi: bookPriceRedux.suiteBedroom.jaccuzzi,
          daily_parking: bookPriceRedux.suiteBedroom.dailyParking,
          all_meals: bookPriceRedux.suiteBedroom.allMeals,
        },
        room_type: "suite",
        count_of_rooms: bookPriceRedux.suiteBedroom.roomCount,
        price: roompriceRedux.SUITE_BEDROOM,
        hotel_id: hotelData.hotel_id,
      },
    ];
    console.log(JSON.stringify(data) + "Ye hai data");
    setShowModal(false);

    let sendData = [];
    if (singleRoom) {
      sendData.push(data[0]);
    }
    if (doubleRoom) {
      sendData.push(data[1]);
    }
    if (suiteRoom) {
      sendData.push(data[2]);
    }
    console.log(JSON.stringify(sendData) + "Send");
    setSingleRoom(false);
    setDoubleRoom(false);
    setSuiteRoom(false);

    try {
      const response = await axios.post(`${backend}/bookRooms`, sendData);
      console.log(response);
      if (response.data == "0") {
        setShowToastFailed(true);
      } else {
        setShowToast(true);
      }
    } catch (error) {}
    props.resetPrice();
    setTotalPrice(0);
  };

  const fetchRooms = async (hotelID) => {
    try {
      const response = await axios.get(`${backend}/fetchRooms/`, {
        params: { hotel_id: hotelID },
      });
      var temp = {};
      console.log(JSON.stringify(response));
      response.data.map(function (room) {
        if (room.room_type === "single") {
          temp["single"] = room.price;
        } else if (room.room_type === "double") {
          temp["double"] = room.price;
        } else if (room.room_type === "suite") {
          temp["suite"] = room.price;
        }
        console.log(temp.single);
      });
      props.initPrices(temp);
      setRoomData(response.data);
      setflagRooms(true);
      setShowModal(true);
      console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };
  let responseRoomData;
  if (RoomData && flagRooms) {
    responseRoomData = React.Children.toArray(
      RoomData.map((room) => (
        <Container fluid className="text-center">
          <CardGroup className="m-9 d-block">
            <Card className="m-5 border-0 shadow" style={styles.card}>
              <Row>
                <Col>
                  <Card.Img src={roomImage} style={styles.cardImage} />
                </Col>
                <Col>
                  {/* <Card.Header as="h3"></Card.Header> */}
                  <Card.Body>
                    <Card.Title as="h3"></Card.Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td>{room.room_type + " "} Room</td>
                          {room.room_type === "single" ? (
                            <td>{roompriceRedux.SINGLE_BEDROOM} </td>
                          ) : room.room_type === "double" ? (
                            <td>{roompriceRedux.DOUBLE_BEDROOM} </td>
                          ) : (
                            <td>{roompriceRedux.SUITE_BEDROOM} </td>
                          )}
                          <td>
                            <label>Rooms</label>
                            <MDBInput
                              type="number"
                              min={1}
                              max={room.count_of_rooms}
                              name={`RoomCount-${room.room_type}`}
                              onChange={handleRoomCount}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form>
                              <Form.Check
                                type="checkbox"
                                // id={`default-${type}`}
                                label="Breakfast"
                                name={`Breakfast-${room.room_type}`}
                                onChange={handleCheck}
                              />
                            </Form>
                          </td>
                          <td>
                            <Form>
                              <Form.Check
                                type="checkbox"
                                // id={`default-${type}`}
                                label="All Meals"
                                name={`AllMeals-${room.room_type}`}
                                onChange={handleCheck}
                              />
                            </Form>
                          </td>
                          <td>
                            <Form>
                              <Form.Check
                                type="checkbox"
                                // id={`default-${type}`}
                                label="Jacuzzi"
                                name={`Jacuzzi-${room.room_type}`}
                                onChange={handleCheck}
                              />
                            </Form>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form>
                              <Form.Check
                                type="checkbox"
                                // id={`default-${type}`}
                                label="Daily Parking"
                                name={`DailyParking-${room.room_type}`}
                                onChange={handleCheck}
                              />
                            </Form>
                          </td>
                          <td>
                            <Form>
                              <Form.Check
                                type="checkbox"
                                // id={`default-${type}`}
                                label="Swimming Pool"
                                name={`SwimmingPool-${room.room_type}`}
                                onChange={handleCheck}
                              />
                            </Form>
                          </td>
                          <td>
                            <Form>
                              <Form.Check
                                type="checkbox"
                                // id={`default-${type}`}
                                label="Fitness Room"
                                name={`FitnessRoom-${room.room_type}`}
                                onChange={handleCheck}
                              />
                            </Form>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Form>
                      <Form.Check
                        type="checkbox"
                        // id={`default-${type}`}
                        label="Select Room"
                        name={room.room_type}
                        onChange={handleSelectRoom}
                      />
                    </Form>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </CardGroup>
        </Container>
      ))
    );
  }

  let responseData;
  if (hotelData && flag) {
    responseData = React.Children.toArray(
      hotelData.map((hotel) => (
        <Container fluid className="text-center">
          <CardGroup className="m-5 d-block">
            <Card
              key={hotel.hotel_id}
              className="m-5 border-0 shadow"
              style={styles.card}
            >
              <Row>
                <Col>
                  <Card.Img src="Image" style={styles.cardImage} />
                </Col>
                <Col>
                  <Card.Header as="h3">{hotel.hotel_name}</Card.Header>
                  <Card.Body>
                    <Card.Title as="h3"></Card.Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td>{hotel.city}</td>
                          <td>From Date {" " + hotel.fromDate}</td>
                          <td>To Date {" " + hotel.toDate}</td>
                        </tr>
                        <tr>
                          <td>
                            Swimming Pool{" "}
                            {hotel.swimming_pool ? <DoneIcon /> : <ClearIcon />}
                          </td>
                          <td>
                            Jacuzzi{" "}
                            {hotel.jacuzzi ? <DoneIcon /> : <ClearIcon />}
                          </td>
                          <td>
                            Fitness Room{" "}
                            {hotel.fitness_room ? <DoneIcon /> : <ClearIcon />}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Daily Parking{" "}
                            {hotel.daily_parking ? <DoneIcon /> : <ClearIcon />}
                          </td>
                          <td>
                            BreakFast{" "}
                            {hotel.daily_continental_breakfast ? (
                              <DoneIcon />
                            ) : (
                              <ClearIcon />
                            )}
                          </td>
                          <td>
                            All Meals{" "}
                            {hotel.all_meals ? <DoneIcon /> : <ClearIcon />}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>

                  <Button
                    variant="outline-dark"
                    onClick={() => fetchRooms(hotel.hotel_id)}
                  >
                    View Rooms
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
      <Card className="m-5 border-0 shadow" style={styles.card}>
        <Card.Body className="rowC">
          {" "}
          <CountrySelect />
          &nbsp; &nbsp;
          <CitySelect />
          &nbsp; &nbsp;
          <FromDate />
          <div className="align">
            <Button variant="outline-primary" size="sm" onClick={handleOnClick}>
              Search Hotels
            </Button>
          </div>
        </Card.Body>
      </Card>
      {responseData}
      <Modal size="lg" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title aria-labelledby="contained-modal-title-vcenter" centered>
            Room Selection{" "}
            <span style={{ textAlign: "right" }}>
              Total Price : {totalPrice}{" "}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responseRoomData}
          <Button variant="outline-dark" size="lg" onClick={handleBooking}>
            Book Room
          </Button>
        </Modal.Body>
      </Modal>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <DoneAllRoundedIcon color="success" /> Booking Successful!
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
            <SmsFailedIcon sx={{ color: pink[500] }} /> Booking Failed!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    {localStorage.getItem("isEmployeeLoggedIn") === "true" &&
      <Card className="m-5 border-0 shadow" style={styles.card}>
         <AdminPage></AdminPage>
      </Card>}
    </>
  );
}

export default connect(null, { fromPrices, initPrices, resetPrice })(Home);
