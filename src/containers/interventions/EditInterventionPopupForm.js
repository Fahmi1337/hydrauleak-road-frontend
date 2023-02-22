import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const EditInterventionPopupForm =({ intervention, onUpdateIntervention, onCancel, onOpen, getInterventions }) => {
  const [contract, setContract] = useState(intervention.contract);
  const [leaker, setLeaker] = useState(intervention.leaker);
  const [zone, setZone] = useState(intervention.zone);
  const [title, setTitle] = useState(intervention.intervention_title);
  const [description, setDescription] = useState(intervention.intervention_description);
  const [address, setAddress] = useState(intervention.address);
  const [city, setCity] = useState(intervention.city);
  const [state, setState] = useState(intervention.state);
  const [zipCode, setZipCode] = useState(intervention.zipcode);
  const [leakTool, setLeakTool] = useState(intervention.intervention_leak_tool);
  const [date, setDate] = useState(intervention.intervention_date);  
  const [estimateTime, setEstimateTime] = useState(intervention.intervention_estimate_time);
 
  const [type, setType] = useState(intervention.intervention_type);
  const [size, setSize] = useState(intervention.city_size);
  const [status, setStatus] = useState(intervention.intervention_status);
  const [published, setPublished] = useState(intervention.is_published);
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };

  const handleContractChange = (event) => {
    setContract(event.target.value);
  };

  const handleLeakerChange = (event) => {
    setLeaker(event.target.value);
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

 

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleLeakToolChange = (event) => {
    setLeakTool(event.target.value);
  };

  const handleEstimateTimeChange = (event) => {
    setEstimateTime(event.target.value);
  };



  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePublishedChange = (event) => {
    setPublished(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedIntervention = {
      ...intervention,
      contract, 
      leaker, 
      zone, 
      title,
      description,
      type, 
      size, 
      status, 
      date, 
      address, 
      city, 
      state, 
      zipCode, 
      estimateTime, 
      leakTool, 
      published, 
    };
    onUpdateIntervention(updatedIntervention);
    getInterventions();
    onCancel(); // close the modal on successful form submission
    
    getInterventions();
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
                <h2>Edit Intervention</h2>
                <form onSubmit={handleSubmit}>
                <label>
                contract:
                    <input type="text" value={contract} onChange={handleContractChange} />
                </label>
                <label>
                leaker:
                    <input type="text" value={leaker} onChange={handleLeakerChange} />
                </label>
                <label>
                zone:
                    <input type="text" value={zone} onChange={handleZoneChange} />
                </label>
                <label>
                title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label>
                description:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
                <label>
                address:
                    <input type="text" value={address} onChange={handleAddressChange} />
                </label>
                <label>
                city:
                    <input type="text" value={city} onChange={handleCityChange} />
                </label>
                <label>
                state:
                    <input type="text" value={state} onChange={handleStateChange} />
                </label>
                <label>
                zipCode:
                    <input type="text" value={zipCode} onChange={handleZipCodeChange} />
                </label>
                <label>
                Leak Tool:
                    <input type="text" value={leakTool} onChange={handleLeakToolChange} />
                </label>
                <label>
                date:
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <label>
                estimate Time:
                    <input type="date" value={estimateTime} onChange={handleEstimateTimeChange} />
                </label>
                <label>
                Intervention type:
                    <select value={type} onChange={handleTypeChange}>
                    <option value="Hight">Hight</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    </select>
                </label>
                <label>
                City size:
                    <select value={size} onChange={handleSizeChange}>
                    <option value="BigCity">BigCity</option>
                    <option value="MediumCity">MediumCity</option>
                    <option value="LittleCity">LittleCity</option>
                    </select>
                </label>
                <label>
                Intervention status:
                    <select value={status} onChange={handleStatusChange}>
                    <option value="notStart">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>
                published:
                    <select value={published} onChange={handlePublishedChange}>
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
}

export default EditInterventionPopupForm;
