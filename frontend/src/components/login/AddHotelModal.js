import React, {useState} from 'react'
import { Modal, Button } from "react-bootstrap";
import AddHotelForm from './AddHotelForm';
const AddHotelModal = (props) => {
  const [showAddHotel, setshowAddHotel] = useState(false);

  const handleCloseAdd = () => setshowAddHotel(false);
  return (
    <div>
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddHotelForm ></AddHotelForm>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AddHotelModal