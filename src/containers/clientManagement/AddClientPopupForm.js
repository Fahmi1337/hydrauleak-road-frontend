import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const style = {
  position: 'absolute',
  overflowY: 'hidden',
  overflowX: 'hidden',
  top: '50%',
  left: '50%',
  width: '55em !important',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgba(255, 255, 255, 1)',
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
  const [error, setError] = useState(null);
  const handleClientDataChange = (e) => {
    
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault(); // prevent the default form submission
  
    // Convert clientData.user to an integer
    const clientDataInt = {
      ...clientData,
      user: parseInt(clientData.user)
    };
  
    axios.post(`${process.env.REACT_APP_API_URL}/api/clients/`, clientDataInt, {
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
        setError(err.message || err.response.statusText);
      });
  };
  



  
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/`,
        {
          method: "GET",
  
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.log(error);
     
    }


  };
  
  useEffect(() => {
    getClients();
  }, []);



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
          
            <div className="popup-form-content">
              <h2>Add Client Details</h2>
              <p>{error}</p>
              <form onSubmit={handleSubmitData}>
              <label >Client profile:</label>        
             
              <select name="user" value={parseInt(clientData.user)} onChange={(e) => handleClientDataChange(e)} required>
                <option disabled value=""> -- select an option -- </option>
                {clients.filter((client) => client.roles.includes("is_client")).map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>


              
                <label> Description *</label>
                  <textarea type="text" name="description" value={clientData.description} onChange={handleClientDataChange} required />
                
                <label>
                  Address:
                  <input type="text" name="address" value={clientData.address} onChange={handleClientDataChange} />
                </label>

                <label>
                Client data creation date *
                    <input  type="datetime-local" name="inscription_date" value={clientData.inscription_date} onChange={handleClientDataChange} required />
                </label>

                <label>File:</label>
                    <input type="file"    />              
                <div className="popup-form-buttons">
                  <button type="submit">Add Client Data</button>
                  <button className="inside-view-popup-button" type="button" onClick={onCancel}>
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