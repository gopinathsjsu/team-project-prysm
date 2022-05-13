import React, {useState} from 'react'
import { Modal, Button } from "react-bootstrap";
import AddHotelForm from './AddHotelForm';
import AdminPage from './AdminPage';
const AdminPageModal = (props) => {
  const [showAddHotel, setshowAddHotel] = useState(false);

  const handleCloseAdd = () => setshowAddHotel(false);
  return (
    <div>
        <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminPage></AdminPage>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AdminPageModal