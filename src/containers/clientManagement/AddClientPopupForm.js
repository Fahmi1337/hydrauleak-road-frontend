import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '60%',
  
  transform: 'translate(-50%, -50%)',
 
  bgcolor: 'rgba(255, 255, 255, 0.75)',
  boxShadow: 24,
  p: 4,
};
const AddClientPopupForm = ({ onCancel, onOpen }) => {
  const [clientData, setClientData] = useState({
    // photo: '',
    description: '',
    address: '',
    roles: '',
    inscription_date: '',
    client_files: []
  });

  const handleClientDataChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault(); // prevent the default form submission
    axios.post(`${process.env.REACT_APP_API_URL}/api/clients/`, clientData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        console.log(res.data);
        onCancel(); // close the modal on successful form submission
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
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
            {/* <div className="popup-form-overlay" onClick={onCancel}></div> */}
            <div className="popup-form-content">
              <h2>Add Client Details</h2>
              <form onSubmit={handleSubmitData}>
              <label>
                  Client User:
                  <select name="roles" value={clientData.roles} onChange={handleClientDataChange}>
                    <option value="is_admin">dev Pending</option>                  
                  </select>
                </label>
                <label> Description:</label>
                  <textarea type="text" name="name" value={clientData.description} onChange={handleClientDataChange} />
                
                <label>
                  Address:
                  <input type="email" name="email" value={clientData.address} onChange={handleClientDataChange} />
                </label>

                <label>
                Client data creation date:
                    <input type="date" value={clientData.inscription_date} onChange={handleClientDataChange} />
                </label>

                <label>File:</label>
                    <input type="file"    />              
                <div className="popup-form-buttons">
                  <button type="submit">Add Client Data</button>
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
};

export default AddClientPopupForm;
