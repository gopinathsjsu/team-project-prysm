import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { cityInfo } from "../../store/actions/searchActions";
import "./CountrySelect.css";
// import EuroIcon from "@mui/icons-material/Euro";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import { MenuItem } from "@mui/material";
const CitySelect = () => {
  const options = [
    { value: "San Jose", label: "San Jose" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "San Fransico", label: "San Fransico" },
    { value: "London", label: "London" },
    { value: "Berlin", label: "Berlin" },
  ];
  const [formValue, setformValue] = React.useState("San Jose");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setformValue(event.value);
    dispatch(cityInfo(event.value));
  };

  // const handleCallback = () => {
  //   setcurrencyvalue(formValue);
  // };
  
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
      borderColor: 'black',
    }),
  };
  return (
    <Form>
      <Form.Group className="search-bar" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
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
export default CitySelect;
