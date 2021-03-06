import React, { useState } from "react";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";

import "./DatePicker.css";
//
import "react-datepicker/dist/react-datepicker.css";
import {
  fromDate,
  fromGuests,
  fromRooms,
  toDate,
} from "../../store/actions/searchActions";
import { useDispatch } from "react-redux";

function FromDatePicker() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfGuests, setnumOfGuests] = useState(1);
  const [numOfRooms, setnumOfRooms] = useState(1);
  const dispatch = useDispatch();

  dispatch(fromGuests(numOfGuests));
  dispatch(fromRooms(numOfRooms));

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
    dispatch(fromDate(date));
  };
  const handleGuests = (value) => {
    setnumOfGuests(value);
    dispatch(fromGuests(value));
  };
  const handleRooms = (value) => {
    setnumOfRooms(value);
    dispatch(fromRooms(value));
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
    dispatch(toDate(date));
  };
  // const handleOnClick = async () => {
  //   if (
  //     searchReduxData.COUNTRY_INFO &&
  //     searchReduxData.CITY_INFO &&
  //     searchReduxData.FROM_DATE &&
  //     searchReduxData.TO_DATE
  //   ) {
  //     if (searchReduxData.TO_DATE >= searchReduxData.FROM_DATE) {
  //       var data = {
  //         country: searchReduxData.COUNTRY_INFO,
  //         city: searchReduxData.CITY_INFO,
  //         fromDate: searchReduxData.FROM_DATE.toISOString().substring(0, 10),
  //         toDate: searchReduxData.TO_DATE.toISOString().substring(0, 10),
  //         numOfRooms: numOfRooms,
  //         numOfGuests: numOfGuests,
  //       };
  //       try {
  //         const response = await axios.post(`${backend}/fetchHotels`, data);
  //         console.log(response, "response");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // };
  return (
    <div className="App">
      <div className="input-container">
        <div className="input-contents">
          <label>Check-in</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={checkInDate}
            minDate={new Date()}
            onChange={handleCheckInDate}
          />
        </div>
        <div className="input-contents">
          <label>Check-out</label>
          <DatePicker
            wrapperClassName="datePicker"
            selected={checkOutDate}
            minDate={checkInDate}
            onChange={handleCheckOutDate}
          />
        </div>
        <div className="inputWrapper">
          <label className="top">Guests</label>
          <NumericInput
            min={1}
            value={numOfGuests}
            className="form-control"
            wrapperClassName="formInput"
            onChange={handleGuests}
          />
        </div>
        &nbsp; &nbsp;
        <div className="inputWrapper">
          <label className="top">Rooms</label>
          <NumericInput
            min={1}
            value={numOfRooms}
            className="form-control"
            wrapperClassName="formInput"
            onChange={handleRooms}
          />
        </div>
        &nbsp; &nbsp;
      </div>
    </div>
  );
}
export default FromDatePicker;
