import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import ChangePassword from './ChangePassword';

function ClientProfile() {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      setUserData(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSaveChanges = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/user/edit_profile/`, {
      name,
      email,
      phone
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      console.log(response);
      window.location.reload();
    })
    .catch(error => {
      setErrorMessage(error.message);
    });
  };

  return (
    <div className="profile-body">
       <h1 className="profile-heading">Profile Settings</h1>
 <div className="profile-container">
     
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form className="profile-form">
      <h2 className='profile-details'>Client Profile details</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <label htmlFor="email">Email:</label>
    <input type="email" id="email" value={email} onChange={handleEmailChange} />
    <label htmlFor="phone">Phone:</label>
    <input type="text" id="phone" value={phone} onChange={handlePhoneChange} />
  
    <button type="button" onClick={handleSaveChanges}>Save Changes</button>
  </form>
  <div className="changePasswordContainer">
  <ChangePassword/>
  </div>

</div>
    </div>
   
);
}

export default ClientProfile;