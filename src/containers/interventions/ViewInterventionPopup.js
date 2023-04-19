import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import GetZoneIntervention from './GetZoneIntervention';

const ViewInterventionPopup = ({ onCancel, onOpen, selectedIntervention, interventionId }) => {



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
        <div className="view-popup-form">
          <div className="inside-view-popup-form">
            <div className="ColumnLeft">
            <h2>{selectedIntervention.intervention_title}</h2>
            <p> <b>Contract:</b> {selectedIntervention.contract}</p>
            <p><b>Description:</b> {selectedIntervention.intervention_description}</p>
            <p><b>Start Date:</b> {selectedIntervention.intervention_date}</p>
            <p><b>Estimate Time:</b> {selectedIntervention.intervention_estimate_time}</p>
            <p><b>Leak Tool:</b> {selectedIntervention.intervention_leak_tool}</p>
            <p><b>Type:</b> {selectedIntervention.intervention_type}</p>
            <p><b>Status:</b> {selectedIntervention.intervention_status}</p>
         
            <p><b>Address:</b> {selectedIntervention.address}</p>
            <p><b>City:</b> {selectedIntervention.city}</p>
            <p><b>State:</b> {selectedIntervention.state}</p>
            <p><b>Zipcode:</b> {selectedIntervention.zipcode}</p>
            <p><b>Published:</b> {selectedIntervention.is_published}</p>
           
            </div>
                  <div className="ColumnRight">
                  <GetZoneIntervention interventionId= {selectedIntervention.id} />
                  </div>
              </div>
            </div>
            <button className="inside-view-popup-button" type="button" onClick={onCancel}>
              Cancel
            </button>
         
        </Box>
      </Modal>
    </>
  );
};

export default ViewInterventionPopup;
