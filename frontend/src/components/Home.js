import React, { useState } from "react";
import "../styles/Header.css";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { StyledEngineProvider } from "@mui/material/styles";
import CountrySelect from "./search/CountrySelect";
import CitySelect from "./search/CitySelect";
import "./Home.css";
import FromDate from "./search/FromDatePicker";
import ToDate from "./search/ToDatePicker";

function Home() {
  return (
    <>
      <br />
      
        <div className="rowC">
          <CountrySelect />
          &nbsp; &nbsp; <CitySelect /> &nbsp; &nbsp; 
        </div>
        <br />
        
        <div className="rowC">
          <FromDate /> &nbsp;&nbsp;&nbsp;
        </div>
      
    </>
  );
}

export default Home;
