import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const ViewPipeAccessPopup = ({ onCancel, onOpen, pipeAccess }) => {

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
          <h3>Pipe Access ID: {pipeAccess.id}</h3>
          <h3>Pipe Access title: {pipeAccess.pipe_access_title}</h3>
          <p>Pipe Access description: {pipeAccess.pipe_access_description}</p>
          <p>Pipe Access type: {pipeAccess.pipe_access_type}</p>
          <p>Pipe Access coordinates: {pipeAccess.pipe_access_coordinates.join(', ')}</p>
          <p>Relative pipe ID: {pipeAccess.pipe}</p>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewPipeAccessPopup;
