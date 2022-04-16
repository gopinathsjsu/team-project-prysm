import { Box, Button } from '@material-ui/core'
import React from 'react'
import 'src/styles/Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import BedIcon from '@mui/icons-material/Bed';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LuggageIcon from '@mui/icons-material/Luggage';
function Home() {
  return (
    <Box display="flex" className='container-body'
         width={1500} height={80} >
      <Button>
        <MenuIcon
        fontSize='medium'
        style={{color:'white'}}></MenuIcon>
      </Button> 
      <Button
        ml={10}
        startIcon={<BedIcon/>}
        variant='text'
        size='large'
        style={{color:'white',textTransform:'none'}}
        >
        Booking.com
      </Button>
      <Box display="flex" className='wrapper'>  
      <Button
        ml={100}
        startIcon={<PersonOutlineIcon/>}
        variant='text'
        size='large'
        style={{color:'white',textTransform:'none'}}
        >
        Sign in or Join
      </Button>
      <Button
        ml={10}
        startIcon={<LuggageIcon/>}
        variant='text'
        size='large'
        style={{color:'white',textTransform:'none'}}
        >
        My Bookings
      </Button>
    </Box>    
    </Box>
  )
}

export default Home