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
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'rgba(255, 255, 255, 1)',
    boxShadow: 24,
    p: 4,
    width: '20%'
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
            <h1 style={{color:'blue'}}>{client.user.name}</h1>
            <h2>Phone: {client.user.phone}</h2>
            <h2>Address: {client.address}</h2>
            <h2>Inscription date: {client.inscription_date}</h2>
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
