import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const EditClientPopupForm =({ client, onUpdateClient, onCancel, onOpen, getClients }) => {
  const [description, setDescription] = useState(client.description);
  const [address, setAddress] = useState(client.address);
  const [inscriptionDate, setInscriptionDate] = useState(client.inscription_date);
  const [clientFiles, setClientFiles] = useState(client.client_files);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleInscriptionDateChange = (event) => {
    setInscriptionDate(event.target.value);
  };

  const handleClientFilesChange = (event) => {
    setClientFiles(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedClient = {
      ...client,
      description,
      address,
      inscriptionDate,
      clientFiles
    };
    onUpdateClient(updatedClient);
    getClients();
    onCancel(); // close the modal on successful form submission
    
    getClients();
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
            <div className="popup-form-overlay" onClick={onCancel}></div>
            <div className="popup-form-content">
                <h2>Edit Client</h2>
                <form onSubmit={handleSubmit}>


                <label>
                  Client User:
                  <input name="name" 
                value={client.user.name} 
                onChange={handleDescriptionChange}
                  />
                    
                </label>
                <label> Description:</label>
                  <textarea type="text" name="name" value={client.description} onChange={handleDescriptionChange} />
                
                <label>
                  Address:
                  <input type="email" name="email" value={client.address} onChange={handleAddressChange} />
                </label>

                <label>
                Client data creation date:
                    <input type="date" value={client.inscription_Date} onChange={handleInscriptionDateChange} />
                </label>

                <label>File:</label>
                    <input type="file"    /> 

                <div className="popup-form-buttons">
                    <button type="submit">Update</button>
                    <button type="button" onClick={onCancel}>
                    Cancel
                    </button>
                </div>

                </form>
            </div>
            </div>

    </Box>
      </Modal>
    </>
  );
}

export default EditClientPopupForm;
