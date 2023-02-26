import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const MarkViewPopup = ({ mark, onCancel, onOpen }) => {


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
        open={onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Mark ID: {mark.id}</h3>
          <h3>Mark Title: {mark.mark_title}</h3>
          <p>Mark Description: {mark.mark_description}</p>
          <p>Mark Coordinates: [{mark.mark_coordinates[0]}, {mark.mark_coordinates[1]}]</p>
          <p>Pipe ID: {mark.pipe}</p>
          <button type="button" onClick={onCancel}>Close</button>
        </Box>
      </Modal>
    </>
  );
}

export default MarkViewPopup;
