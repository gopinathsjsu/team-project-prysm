
import { React,useState } from 'react';
import { Button, Box } from '@material-ui/core'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import YardIcon from '@mui/icons-material/Yard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import 'src/styles/Header.css'
function Navbar() {
  const [showHeader, setShowHeader] = useState();
  return (
  <Box className='container'>
    <Box display="flex" 
        width={1500} height={80} 
        alignItems="center"
        justifyContent="center">
      <Button
        startIcon={<VerifiedUserIcon/>}
        variant='text'
        size='large'
        style={{color:'white',textTransform:'none'}}
        >
        Best Rate Gurantee 
      </Button>
      <Button
        startIcon={<MoreTimeIcon/>}
        variant='text'
        size='large'
        style={{color:'white',textTransform:'none'}}
        >
        Flixebile Time
      </Button>
      <Button
        startIcon={<CardTravelIcon/>}
        variant='text'
        size='large'
        style={{color:'white',textTransform:'none'}}
        >
        Travel Guidance
      </Button>
      <Button
        startIcon={<YardIcon/>}
        variant='text'
        size='large'
        style={{color:'white', textTransform:'none'}}
        >
        Commitment to Clean
      </Button>
      <Box ml={10} >
        <Button
          startIcon={<KeyboardArrowUpIcon/>}
          variant='text'
          size='large'
          style={{color:'white', textTransform:'none'}}
          >
        </Button>
      </Box>
    </Box>
  </Box>

  )
}

export default Navbar;