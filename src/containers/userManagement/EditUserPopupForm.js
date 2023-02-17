import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const EditUserPopupForm =({ user, onUpdateUser, onCancel, onOpen, getUsers }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [roles, setRoles] = useState(user.roles);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleRolesChange = (event) => {
    setRoles(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...user,
      name,
      email,
      phone,
      roles,
    };
    onUpdateUser(updatedUser);
    getUsers();
    onCancel(); // close the modal on successful form submission
    
    getUsers();
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
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Phone:
                    <input type="text" value={phone} onChange={handlePhoneChange} />
                </label>
                <label>
                    Roles:
                    <select value={roles} onChange={handleRolesChange}>
                    <option value="is_admin">Admin</option>
                    <option value="is_client">Client</option>
                    <option value="is_leaker">Leaker</option>
                    </select>
                </label>
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

export default EditUserPopupForm;
