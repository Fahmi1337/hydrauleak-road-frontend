import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
const AddInterventionPopupForm = ({ onCancel, onOpen }) => {
  const [interventionData, setInterventionData] = useState({
   
    contract: '', 
      leaker: '', 
      zone: '', 
      title: '',
      description: '',
      type: '', 
      size: '', 
      status: '', 
      date: '', 
      address: '', 
      city: '', 
      state: '', 
      zipCode: '', 
      estimateTime: '', 
      leakTool: '', 
      published: ''
  });

  const handleInterventionDataChange = (e) => {
    setInterventionData({
      ...interventionData,
      [e.target.title]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault(); // prevent the default form submission
    axios.post(`${process.env.REACT_APP_API_URL}/api/interventions/`, interventionData, {
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
              <h2>Add Intervention</h2>
              <form onSubmit={handleSubmitData}>
                <label>
                contract:
                    <input type="text" value={interventionData.contract} onChange={handleInterventionDataChange} />
                </label>
                <label>
                leaker:
                    <input type="email" value={interventionData.leaker} onChange={handleInterventionDataChange} />
                </label>
                <label>
                zone:
                    <input type="text" value={interventionData.zone} onChange={handleInterventionDataChange} />
                </label>
                <label>
                title:
                    <input type="text" value={interventionData.title} onChange={handleInterventionDataChange} />
                </label>
                <label>
                description:
                    <input type="email" value={interventionData.description} onChange={handleInterventionDataChange} />
                </label>
                <label>
                address:
                    <input type="text" value={interventionData.address} onChange={handleInterventionDataChange} />
                </label>
                <label>
                city:
                    <input type="text" value={interventionData.city} onChange={handleInterventionDataChange} />
                </label>
                <label>
                state:
                    <input type="text" value={interventionData.state} onChange={handleInterventionDataChange} />
                </label>
                <label>
                zipCode:
                    <input type="text" value={interventionData.zipCode} onChange={handleInterventionDataChange} />
                </label>
                <label>
                Leak Tool:
                    <input type="text" value={interventionData.leakTool} onChange={handleInterventionDataChange} />
                </label>
                <label>
                date:
                    <input type="date" value={interventionData.date} onChange={handleInterventionDataChange} />
                </label>
                <label>
                estimate Time:
                    <input type="date" value={interventionData.estimateTime} onChange={handleInterventionDataChange} />
                </label>
                <label>
                Intervention type:
                    <select value={interventionData.type} onChange={handleInterventionDataChange}>
                    <option value="Hight">Hight</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    </select>
                </label>
                <label>
                City size:
                    <select value={interventionData.size} onChange={handleInterventionDataChange}>
                    <option value="BigCity">BigCity</option>
                    <option value="MediumCity">MediumCity</option>
                    <option value="LittleCity">LittleCity</option>
                    </select>
                </label>
                <label>
                Intervention status:
                    <select value={interventionData.status} onChange={handleInterventionDataChange}>
                    <option value="notStart">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>
                published:
                    <select value={interventionData.published} onChange={handleInterventionDataChange}>
                    <option value="Published">Published</option>
                    <option value="Not Published">Not Published</option>
                   
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
};

export default AddInterventionPopupForm;
