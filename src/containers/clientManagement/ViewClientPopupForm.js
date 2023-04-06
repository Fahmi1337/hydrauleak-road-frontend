import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ViewClientPopupForm = ({ clientId, onClose, onOpen }) => {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/clients/${clientId}/`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
        setClient(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchClient();
  }, [clientId]);

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
      <div className="client-popup-box">
        {isLoading && <div>Loading...</div>}
        {!isLoading && client && (
          <>
            <h2>{client.user.name}</h2>
            <p>Phone: {client.user.phone}</p>
            <p>Address: {client.address}</p>
            <p>Inscription date: {client.inscription_date}</p>
            <button >Download File</button>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
      </Box>
      </Modal>
      
      
      </>
      );
};

export default ViewClientPopupForm;
