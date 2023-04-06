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
const AddUserPopupForm = ({ onCancel, onOpen }) => {
  const [userData, setUserData] = useState({
    roles : 'is_client'
  });

  const handleUserDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault(); // prevent the default form submission
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/`, userData, {
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
              <h2>Add User</h2>
              <form onSubmit={handleSubmitData}>
                <label>
                  Name:
                  <input type="text" name="name" value={userData.name} onChange={handleUserDataChange} required  />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={userData.email} onChange={handleUserDataChange} required  />
                </label>
                <label>
                  Phone:
                  <input type="text" name="phone" value={userData.phone} onChange={handleUserDataChange} required  />
                </label>
                <label>
                  Roles:
                  <select name="roles" value={userData.roles} onChange={handleUserDataChange} required >
                  <option value="is_client">Client</option>
                    <option value="is_admin">Admin</option>
                    <option value="is_leaker">Leaker</option>
                  </select>
                </label>
                <div className="popup-form-buttons">
                  <button type="submit">Add User</button>
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

export default AddUserPopupForm;
