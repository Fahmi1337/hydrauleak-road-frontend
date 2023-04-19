import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const ViewZonePopup = ({ onCancel, onOpen, zone }) => {

//   const style = {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: '20%',
//     height: '100%',
//     bgcolor: 'background.paper',
//     p: 4,
//   };

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
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
      
        <h3>ID: {zone.id}</h3>
          <h3>Zone Title: {zone.zone_title}</h3>
          <p>Zone Intervention ID: {zone.intervention}</p>
          <p>Zone Map ID: {zone.map}</p>
          <p>Zone Description: {zone.zone_description}</p>
          <p>Zone Area: {zone.zone_area}</p>
          <p>Zone Date: {zone.zone_date}</p>
          <p>Zone Status: {zone.zone_status}</p>
          <p>Zone Color: {zone.zone_color}</p>
          <p>Zone Coordinates: {JSON.stringify(zone.zone_coordinates)}</p>
          
          </div>
          
          <button className="inside-view-popup-button" type="button" onClick={onCancel}>
            Cancel
          </button>
         
        
      </Box>
    </Modal>
  );
};

export default ViewZonePopup;
