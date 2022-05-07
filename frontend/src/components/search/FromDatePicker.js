// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import Stack from "@mui/material/Stack";

// export default function FromDatePicker() {
//   const [fromValue, setFromValue] = React.useState(new Date());

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Stack spacing={3}>
//           <DesktopDatePicker
//             label="From Date"
//             value={fromValue}
//             minDate={new Date().toISOString().split("T")[0]}
//             onChange={(newValue) => {
//               setFromValue(newValue);
//               console.log(fromValue, "abc");
//             }}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </Stack>
//       </LocalizationProvider>
//     </>
//   );
// }
// import React, { useState } from "react";
// import DatePicker from "react-date-picker";

// function FromDatePicker() {
//   const [value, onChange] = useState(new Date());

//   return (
//     <div>
//       <DatePicker onChange={onChange} value={value} />
//     </div>
//   );
// }
// export default FromDatePicker;
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { Button } from "react-bootstrap";
import "./DatePicker.css";
//
import "react-datepicker/dist/react-datepicker.css";
import { fromDate, toDate } from "../../store/actions/searchActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backend } from "../config";

function FromDatePicker() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const dispatch = useDispatch();
  const { searchReducer } = useSelector((state) => state);
  console.log(searchReducer, "aa");
  const searchReduxData = searchReducer.searchReducer;
  console.log(searchReduxData.FROM_DATE.toISOString().substring(0, 10), "aaa");
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
    dispatch(fromDate(date));
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
    dispatch(toDate(date));
  };
  const handleOnClick = async () => {
    if (
      searchReduxData.COUNTRY_INFO &&
      searchReduxData.CITY_INFO &&
      searchReduxData.FROM_DATE &&
      searchReduxData.TO_DATE
    ) {
      if (searchReduxData.TO_DATE >= searchReduxData.FROM_DATE) {
        var data = {
          country: searchReduxData.COUNTRY_INFO,
          city: searchReduxData.CITY_INFO,
          fromDate: searchReduxData.FROM_DATE.toISOString().substring(0, 10),
          toDate: searchReduxData.TO_DATE.toISOString().substring(0, 10),
          numOfRooms: "2",
          numOfGuests: "2",
        };
        try {
          const response = await axios.post(`${backend}/fetchHotels`, data);
          console.log(response, "response");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
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
      {/* {checkInDate && checkOutDate && (
        <div className="summary">
          <p>
            You book a hotel from {moment(checkInDate).format("LL")} to{" "}
            {moment(checkOutDate).format("LL")}.
          </p>
        </div>
      )} */}
      <br />
      <br />
      <div className="align">
        <Button variant="outline-primary" onClick={handleOnClick}>
          Search Hotels
        </Button>
      </div>
    </div>
  );
}
export default FromDatePicker;
