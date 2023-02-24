import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const SensorViewPopup =({ onCancel, onOpen, sensor }) => {


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
            <h3>Sensor ID: {sensor.id}</h3>
            <h3>Sensor title: {sensor.sensor_title}</h3>
            
            <p>Sensor description: {sensor.sensor_description}</p>
            <p>Sensor type: {sensor.sensor_type}</p>
            <p>Sensor diameter range: {sensor.sensor_diameter_range}</p>             
            <p>Sensor indication: {sensor.sensor_Indication}</p>
            
            <p>Sensor Picture: {sensor.sensor_photo}</p>
            <p>Sensor frequency: {sensor.sensor_frequency}</p>
            <p>Sensor relative pipe id: {sensor.pipe}</p>             
            

            
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>

    </Box>
      </Modal>
    </>
  );
}

export default SensorViewPopup;
