import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const ReportPopup =({ onCancel, onOpen, selectedReport }) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
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
            <h2>{selectedReport.subject}</h2>
        <p>description: {selectedReport.message}</p>
        <p>Report Date: {selectedReport.report_date}</p>
        <p>Add Sensor Coordinates: {selectedReport.add_sensor_coordinates.join(', ')}</p>
        <p>Add Mark Coordinates: {selectedReport.add_mark_coordinates.join(', ')}</p>
        <p>Add Pipe Coordinates: {selectedReport.add_pipe_coordinates.join(', ')}</p>
        <p>Add Pipe Access Coordinates: {selectedReport.add_pipe_access_coordinates.join(', ')}</p>
        <button type="button" onClick={onCancel}>
                    Cancel
                    </button>
            </div>

    </Box>
      </Modal>
    </>
  );
}

export default ReportPopup;
