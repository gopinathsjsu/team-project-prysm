import React, {useState, useEffect} from 'react'
import axios from "axios";
import { backend } from "../config";
import {
  Table,
  Button,
} from "react-bootstrap";
import AddHotelModal from './AddHotelModal';


const AdminPage = ()=> {
    const styles = {
    card: {
      backgroundColor: "White",
      borderRadius: 55,
      padding: "2rem",
    },
    cardImage: {
      height: "100%",
      objectFit: "cover",
      borderRadius: 15,
    },
  };

  const[hotelData, setHotelData] = useState([]);
  const[addHotel, setAddHotel] = useState(false);


    useEffect(()=>{
        const gethotels = async ()=> {
          try{
              const response = await axios.get(`${backend}/getHotels`);
              setHotelData(response.data);
            }catch(error){
              console.log(error);
            }
        }
      gethotels();
    }, [setHotelData]);

  const handleAddHotel = async ()=>{
     console.log("add");
    setAddHotel(true);
    console.log(addHotel);

    // try {
    //   const response = axios.get(`${backend}/getHotels`);
    //   console.log(response.data);

    // } catch (error) {
      
    // }

  }


    let responseData = hotelData.map((hotel)=> {
      return(
      <tr>
      <td>{hotel.hotel_id}</td>
      <td>{hotel.hotel_name}</td>
      <td>{hotel.country}</td>
      <td>{hotel.city}</td>
      <td>{hotel.daily_continental_breakfast?"True":"False" }</td>
      <td>{hotel.fitness_room?"True":"False" }</td>
      <td>{hotel.Swimming_pool?"True":"False" }</td>
      <td>{hotel.jacuzzi?"True":"False" }</td>
      <td>{hotel.daily_parking?"True":"False" }</td>
      <td>{hotel.all_meals?"True":"False" }</td>
    </tr>
      )
    })

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Hotel Id</th>
            <th>Hotel Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Daily Continental Breakfast</th>
            <th>Fitness Room</th>
            <th>Swimming Pool</th>
            <th>Jacuzzi</th>
            <th>Daily Parking</th>
            <th>All Meals</th>
          </tr>
        </thead>
        <tbody>
          {responseData}
        </tbody>
      </Table>
      <Button variant="dark" type="submit" size="md"  onClick={handleAddHotel}>
        Add New Hotel
      </Button>
      <AddHotelModal
      show={addHotel}
      onHide={() => setAddHotel(false)}
    />
      
</div>
  )

}

export default AdminPage