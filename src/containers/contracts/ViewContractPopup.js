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
        <div className="view-popup-form">
          <div className="inside-view-popup-form">
            <div className="ColumnLeft">
                <h2>Contract Details</h2>
                <p><b>Title:</b> {selectedContract.contract_title}</p>
                <p><b>Description:</b> {selectedContract.contract_description}</p>
                <p><b>Client name:</b> {selectedContract.client.user.name}</p>
                <p><b>Contract start date:</b> {selectedContract.contract_date}</p>
                <p><b>Estimate Time:</b> {selectedContract.contract_estimate_end_date}</p>
                <p><b>Type:</b> {selectedContract.contract_type}</p>
                <p><b>Status:</b> {selectedContract.contract_status}</p>
                
                <p><b>Address:</b> {selectedContract.address}</p>
                <p><b>City:</b> {selectedContract.city}</p>
                <p><b>State:</b> {selectedContract.state}</p>
                <p><b>Zipcode:</b> {selectedContract.zipcode}</p>
                <p><b>Published:</b> {selectedContract.is_published}</p>
            </div>
                <div className="ColumnRight">
                <GetMapContract contractId= {selectedContract.id} />
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

export default ViewContractPopup;
