import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const ReportPopup =({ onCancel, onOpen, selectedReport }) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'rgba(255, 255, 255, 1)',
    boxShadow: 24,
    p: 4,
    width: '50%'
  };


  return (

    <>

    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={onOpen}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="popup-form">
          
            <h2>ID: {selectedReport.id} <br></br><br></br>Report Subject: {selectedReport.subject}</h2>
        <p> <b>Message:</b> {selectedReport.message}</p>
        <p> <b>Report Sender Name:</b> {selectedReport.user_name}</p>
        <p> <b>Report Sender Role: </b>{selectedReport.user_role}</p>
        <p> <b>Report Date:</b> {selectedReport.report_date}</p>
        <p> <b>Report Image: </b>{selectedReport.image}</p>      
        <p> <b>Mark Coordinates: </b>{selectedReport.add_mark_coordinates}</p>
        {/* <p> <b>Sensor Coordinates: </b>{selectedReport.add_sensor_coordinates}</p> 
        <p> <b>Pipe Coordinates: </b>{selectedReport.add_pipe_coordinates}</p>
        <p> <b>Pipe Access Coordinates: </b>{selectedReport.add_pipe_access_coordinates}</p> */}
        <button className="inside-view-popup-button" type="button" onClick={onCancel}>
                    Cancel
                    </button>
            </div>

    </Box>
      </Modal>
    </>
  );
}

export default ReportPopup;
