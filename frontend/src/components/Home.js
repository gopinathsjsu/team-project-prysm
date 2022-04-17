import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import "../styles/Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LuggageIcon from "@mui/icons-material/Luggage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Home(props) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      display="flex"
      className="container-body"
      width={1680}
      height={80}
      alignItems="center"
    >
      <Button>
        <MenuIcon fontSize="medium" style={{ color: "white" }}></MenuIcon>
      </Button>
      <Box className="wrapper">
        <Button
          ml={10}
          variant="text"
          size="large"
          style={{ color: "white", textTransform: "none" }}
        >
          COVID-19
        </Button>
        <Button
          ml={10}
          startIcon={<PersonOutlineIcon />}
          variant="text"
          size="large"
          style={{ color: "white", textTransform: "none" }}
          onClick={() => setOpen(!open)}
        >
          Sign In or Join
          <Button
            startIcon={<KeyboardArrowDownIcon />}
            variant="text"
            size="large"
            style={{ color: "white", textTransform: "none" }}
          ></Button>
          {open && props.children}
        </Button>
        <Button
          ml={10}
          startIcon={<LuggageIcon />}
          variant="text"
          size="large"
          style={{ color: "white", textTransform: "none" }}
        >
          My Trips
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
