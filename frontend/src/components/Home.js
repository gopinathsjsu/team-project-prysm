import React from "react";
import "../styles/Header.css";
import { Card } from "react-bootstrap";

import CountrySelect from "./search/CountrySelect";
import CitySelect from "./search/CitySelect";
import "./Home.css";
import FromDate from "./search/FromDatePicker";

function Home() {
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
        </Card.Body>
      </Card>
      {/* <div className="rowC">
        <CountrySelect />
        <CitySelect /> &nbsp; &nbsp;
      </div>
      <br />

      <div className="rowC">
        <FromDate /> &nbsp;&nbsp;&nbsp;
      </div> */}
    </>
  );
}

export default Home;
