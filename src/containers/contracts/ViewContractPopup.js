import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import GetMapContract from './GetMapContract';

const ViewContractPopup = ({ onCancel, onOpen, selectedContract, contractId }) => {



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


  console.log ("contract details" , selectedContract)
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
            <div className="ColumnLeft">
            <h2>Contract Details</h2>
            <p>Title: {selectedContract.contract_title}</p>
            <p>Description: {selectedContract.contract_description}</p>
            <p>Client name: {selectedContract.client.user.name}</p>
            <p>Contract start date: {selectedContract.contract_date}</p>
            <p>Estimate Time: {selectedContract.contract_estimate_end_date}</p>
            <p>Type: {selectedContract.contract_type}</p>
            <p>Status: {selectedContract.contract_status}</p>
            
            <p>Address: {selectedContract.address}</p>
            <p>City: {selectedContract.city}</p>
            <p>State: {selectedContract.state}</p>
            <p>Zipcode: {selectedContract.zipcode}</p>
            <p>Published: {selectedContract.is_published}</p>
            </div>
            <div className="ColumnRight">
            <GetMapContract contractId= {selectedContract.id} />
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            </div>
            
            

           
           
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewContractPopup;
