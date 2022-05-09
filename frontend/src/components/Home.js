import React, { useState } from "react";
import "../styles/Header.css";
import {
  Table,
  Container,
  CardGroup,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import CountrySelect from "./search/CountrySelect";
import CitySelect from "./search/CitySelect";
import "./Home.css";
import FromDate from "./search/FromDatePicker";
import { useSelector } from "react-redux";
import axios from "axios";
import { backend } from "./config";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

function Home() {
  const [hotelData, sethotelData] = useState([]);
  const [flag, setFlag] = useState(false);
  const { searchReducer } = useSelector((state) => state);
  const styles = {
    card: {
      backgroundColor: "White",
      borderRadius: 55,
      padding: "3rem",
    },
    cardImage: {
      height: "100%",
      objectFit: "cover",
      borderRadius: 55,
    },
  };

  const searchReduxData = searchReducer.searchReducer;
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
                    <Table >
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

                  <Button variant="outline-dark">View Rooms</Button>
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
    </>
  );
}

export default Home;
