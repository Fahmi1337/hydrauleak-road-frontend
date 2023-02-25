import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const ViewPipePopup = ({ onCancel, onOpen, pipe }) => {
 

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
            <h3>Pipe ID: {pipe.id}</h3>
            <h3>Pipe Title: {pipe.pipe_title}</h3>

            <p>Pipe Description: {pipe.pipe_description}</p>
            <p>Pipe Type: {pipe.pipe_type}</p>
            <p>Pipe Diameter: {pipe.pipe_diameter} mm</p>
            <p>Pipe Material: {pipe.pipe_material}</p>
            <p>Pipe Length: {pipe.pipe_length} m</p>
            <p>Pipe Status: {pipe.pipe_status}</p>
            <p>Pipe Coordinates: ({pipe.pipe_coordinates.latitude}, {pipe.pipe_coordinates.longitude})</p>
            <p>Map: {pipe.map}</p>

            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewPipePopup;
