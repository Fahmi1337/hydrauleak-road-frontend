import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddMarkPopup = (props) => {

    // const showMarkModal = props.handleShowMarkModal()
    // const handleCloseMarkModal = props.handleCloseMarkModal()
    // const handleClose = props.handleClose()

    const [showMarkModal, setShowMarkModal] = useState(false);

    const handleCloseMarkModal = () => setShowMarkModal(false);
    const handleShowMarkModal = () => setShowMarkModal(true);

  return (
    <>
    
    <Button variant="primary" onClick={handleShowMarkModal} >
    Open Mark Modal
    </Button>
    <Modal show={showMarkModal} onHide={handleCloseMarkModal} >
        <Modal.Header closeButton>
          <Modal.Title>Mark Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Mark modal content goes here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMarkModal} >
            Close
          </Button >
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>


  </>
  )
}

export default AddMarkPopup