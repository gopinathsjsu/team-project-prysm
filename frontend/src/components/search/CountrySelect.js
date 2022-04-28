import React from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import "./CountrySelect.css";
// import EuroIcon from "@mui/icons-material/Euro";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import { MenuItem } from "@mui/material";
const CountrySelect = () => {
  const options = [
    { value: "USA", label: "USA" },
    { value: "India", label: "India" },
    { value: "England", label: "England" },
    { value: "Germany", label: "Germany" },
  ];
  const [formValue, setformValue] = React.useState("USA");

  const handleChange = (event) => {
    setformValue(event.value);
  };

  // const handleCallback = () => {
  //   setcurrencyvalue(formValue);
  // };
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 55,
      minHeight: 55,
    }),
  };

  return (
    <Form>
      <Form.Group className="search-bar" controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Select
          name="name"
          placeholder={formValue}
          searchable={true}
          value={formValue}
          options={options}
          onChange={handleChange}
          styles={customStyles}
         
        />
      </Form.Group>
      {/* <div style={{ float: "right" }}>
        <Button variant="dark" type="submit" size="sm">
          {" "}
          Save
        </Button>
      </div> */}
    </Form>
  );
};
export default CountrySelect;
