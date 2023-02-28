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
const AddInterventionPopupForm = ({ onCancel, onOpen }) => {
  const [interventionData, setInterventionData] = useState({
   
    contract: 1, 
      
    intervention_title: '',
    intervention_description: '',
    intervention_type: 'Simple', 
     
      intervention_status: 'NotStart', 
      // intervention_date: '', 
      address: '', 
      city: '', 
      state: '', 
      zipcode: '', 
      // intervention_estimate_time: '', 
      intervention_leak_tool: '', 
      is_published: 'Not Published'
  });

  const handleInterventionDataChange = (e) => {
    setInterventionData({
      ...interventionData,
      [e.target.name]: e.target.value,
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
                    <input type="number" name='contract' value={interventionData.contract} onChange={handleInterventionDataChange} />
                </label>
                {/*
                <label>
                leaker:
                    <input type="email" name='leaker' value={interventionData.leaker} onChange={handleInterventionDataChange} />
                </label>
                <label>
                zone:
                    <input type="text" name='zone' value={interventionData.zone} onChange={handleInterventionDataChange} />
                </label> */}
                <label>
                title:
                    <input type="text" name='intervention_title' value={interventionData.intervention_title} onChange={handleInterventionDataChange} />
                </label>
                <label>
                description:
                    <textarea type="text" name='intervention_description' value={interventionData.intervention_description} onChange={handleInterventionDataChange} />
                </label>
                <label>
                Leak Tools:
                    <input type="text" name='intervention_leak_tool' value={interventionData.intervention_leak_tool} onChange={handleInterventionDataChange} />
                </label>
                <label>
                address:
                    <input type="text" name='address' value={interventionData.address} onChange={handleInterventionDataChange} />
                </label>
                <label>
                city:
                    <input type="text" name='city' value={interventionData.city} onChange={handleInterventionDataChange} />
                </label>
                <label>
                state:
                    <input type="text" name='state' value={interventionData.state} onChange={handleInterventionDataChange} />
                </label>
                <label>
                zipCode:
                    <input type="text" name='zipcode' value={interventionData.zipcode} onChange={handleInterventionDataChange} />
                </label>
                <label>
                date:
                    <input type="date" name='intervention_date' value={interventionData.intervention_date} onChange={handleInterventionDataChange} />
                </label>
                <label>
                estimate Time:
                    <input type="date" name='intervention_estimate_time' value={interventionData.intervention_estimate_time} onChange={handleInterventionDataChange} />
                </label>
                <label>
                Intervention type:
                    <select  type="text" name='intervention_type' value={interventionData.intervention_type} onChange={handleInterventionDataChange}>                   
                    <option value="Simple">Medium</option>
                    <option value="PipeSearch">Low</option>
                    <option value="Hight">Hight</option>
                    </select>
                </label>
                {/* <label>
                City size:
                    <select value={interventionData.size} onChange={handleInterventionDataChange}>
                    <option value="BigCity">BigCity</option>
                    <option value="MediumCity">MediumCity</option>
                    <option value="LittleCity">LittleCity</option>
                    </select>
                </label> */}
                <label>
                Intervention status:
                    <select type="text" name='intervention_status'  value={interventionData.intervention_status} onChange={handleInterventionDataChange}>
                    <option value="NotStart">Not Started</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>
                published:
                    <select  type="text" name='is_published' value={interventionData.is_published} onChange={handleInterventionDataChange}>
                    <option value="Not Published">Not Published</option>
                    <option value="Published">Published</option>
                    
                   
                    </select>
                </label>
                
                <div className="popup-form-buttons">
                    <button type="submit">Submit</button>
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
