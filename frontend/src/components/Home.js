import React, { useState } from "react";
import "../styles/Header.css";
import { Card, Button } from "react-bootstrap";

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
  const { searchReducer } = useSelector((state) => state);

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
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  let responseData;
  if (hotelData) {
    responseData = hotelData.map((hotel) => (
      <Card key={hotel.hotel_id}>
        <Card.Body>
          {hotel.country},{hotel.city}, {hotel.hotel_name} Swimming Pool
          {hotel.swimming_pool ? <DoneIcon /> : <ClearIcon />}
          Jacuzzi {hotel.jacuzzi ? <DoneIcon /> : <ClearIcon />}
          Fitness Room {hotel.fitness_room ? <DoneIcon /> : <ClearIcon />}
          Daily Parking {hotel.daily_parking ? <DoneIcon /> : <ClearIcon />}
          BreakFast
          {hotel.daily_continental_breakfast ? <DoneIcon /> : <ClearIcon />}
          All Meals {hotel.all_meals ? <DoneIcon /> : <ClearIcon />}
          From Date {hotel.fromDate}
          To Date {hotel.toDate}
        </Card.Body>
      </Card>
    ));
  }
  return (
    <>
      <br />
      <Card>
        <Card.Body className="rowC">
          {" "}
          <CountrySelect />
          &nbsp; &nbsp;
          <CitySelect />
          &nbsp; &nbsp;
          <FromDate />
          <div className="align">
            <Button variant="outline-primary" onClick={handleOnClick}>
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
