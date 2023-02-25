import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const MapViewPopup = ({ onCancel, onOpen, map }) => {


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
            <h3>Map ID: {map.id}</h3>
            <h3>Map Title: {map.map_title}</h3>
            <p>Map Description: {map.map_description}</p>
            <p>Map Coordinates: {map.map_coordinate}</p>
            <p>Map Creation Date: {map.map_creation_date}</p>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MapViewPopup;
