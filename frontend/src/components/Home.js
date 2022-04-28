import React, { useState } from "react";
import "../styles/Header.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
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
      <StyledEngineProvider injectFirst>
        <div className="rowC">
          <CountrySelect />
          &nbsp; &nbsp; <CitySelect /> &nbsp; &nbsp;
        </div>
        <br />
        <br />
        <div className="rowC">
          <FromDate /> &nbsp;&nbsp;&nbsp;
          <ToDate />
        </div>
      </StyledEngineProvider>
    </>
  );
}

export default Home;
