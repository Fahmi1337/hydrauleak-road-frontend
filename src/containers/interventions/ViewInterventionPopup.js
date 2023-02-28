import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import GetZoneIntervention from './GetZoneIntervention';

const ViewInterventionPopup = ({ onCancel, onOpen, selectedIntervention, interventionId }) => {



  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };


  console.log ("intervention details" , selectedIntervention)
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
            <h2>{selectedIntervention.intervention_title}</h2>
            <p>Description: {selectedIntervention.intervention_description}</p>
            <p>Estimate Time: {selectedIntervention.intervention_estimate_time}</p>
            <p>Leak Tool: {selectedIntervention.intervention_leak_tool}</p>
            <p>Type: {selectedIntervention.intervention_type}</p>
            <p>Status: {selectedIntervention.intervention_status}</p>
            <p>Date: {selectedIntervention.intervention_date}</p>
            <p>Address: {selectedIntervention.address}</p>
            <p>City: {selectedIntervention.city}</p>
            <p>State: {selectedIntervention.state}</p>
            <p>Zipcode: {selectedIntervention.zipcode}</p>
            <p>Published: {selectedIntervention.is_published}</p>
            <p>Contract: {selectedIntervention.contract}</p>

            <GetZoneIntervention interventionId= {interventionId} />
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewInterventionPopup;
