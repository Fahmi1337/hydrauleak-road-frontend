import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const EditInterventionPopupForm =({ intervention, onUpdateIntervention, onCancel, onOpen, getInterventions }) => {
  // const [contract, setContract] = useState(intervention.contract);
  // const [leaker, setLeaker] = useState(intervention.leaker);
  const [zone, setZone] = useState(intervention.zone);
  const [intervention_title, setTitle] = useState(intervention.intervention_title);
  const [intervention_description, setDescription] = useState(intervention.intervention_description);
  const [address, setAddress] = useState(intervention.address);
  const [city, setCity] = useState(intervention.city);
  const [state, setState] = useState(intervention.state);
  const [zipcode, setZipCode] = useState(intervention.zipcode);
  const [leakTool, setLeakTool] = useState(intervention.intervention_leak_tool);
  const [intervention_date, setDate] = useState(intervention.intervention_date);  
  const [intervention_estimate_time, setEstimateTime] = useState(intervention.intervention_estimate_time);
 
  const [intervention_type, setType] = useState(intervention.intervention_type);
  const [size, setSize] = useState(intervention.city_size);
  const [intervention_status, setStatus] = useState(intervention.intervention_status);
  const [is_published, setPublished] = useState(intervention.is_published);
  

  const style = {
    position: 'absolute',
    // overflowY: 'hidden',
    // overflowX: 'hidden',
    top: '44%',
    left: '53%',
    width: '105em !important',
    height:'50rem',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'rgba(255, 255, 255, 1)',
    boxShadow: 24,
    p: 4,
  };

  // const handleContractChange = (event) => {
  //   setContract(event.target.value);
  // };

  // const handleLeakerChange = (event) => {
  //   setLeaker(event.target.value);
  // };

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
      // contract, 
      // leaker, 
      zone, 
      intervention_title,
      intervention_description,
      intervention_type, 
      size, 
      intervention_status, 
      intervention_date, 
      address, 
      city, 
      state, 
      zipcode, 
      intervention_estimate_time, 
      leakTool, 
      is_published, 
    };
    onUpdateIntervention(updatedIntervention);
    getInterventions();
    onCancel(); // close the modal on successful form submission
    getInterventions();
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
        aria-describedby="modal-modal-intervention_description"
      >
        <Box sx={style}>
            <div className="add-popup-form">
            
            <div className="popup-form-content">
                <h2>Edit Intervention</h2>
                <form onSubmit={handleSubmit}>
                <div className="popup-form add-popup-form">
                {/* <label>
                contract:
                    <input type="text" value={contract} onChange={handleContractChange} />
                </label>
                <label>
                leaker:
                    <input type="text" value={leaker} onChange={handleLeakerChange} />
                </label> */}
                {/* <label>
                zone:
                    <input type="text" value={zone} onChange={handleZoneChange} />
                </label> */}
                <label>
                title:
                    <input type="text" value={intervention_title} onChange={handleTitleChange} />
                </label>
                <label>
                Intervention description:
                    <input type="text" value={intervention_description} onChange={handleDescriptionChange} />
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
                zipcode:
                    <input type="text" value={zipcode} onChange={handleZipCodeChange} />
                </label>
                <label>
                Leak Tool:
                    <input type="text" value={leakTool} onChange={handleLeakToolChange} />
                </label>
                <label>
                date:
                    <input type="date" value={intervention_date} onChange={handleDateChange} />
                </label>
                <label>
                estimate Time:
                    <input type="date" value={intervention_estimate_time} onChange={handleEstimateTimeChange} />
                </label>
                <label>
                Intervention type:
                    <select value={intervention_type} onChange={handleTypeChange}>
                    <option value="Hight">Hight</option>
                    <option value="Simple">Simple</option>
                    <option value="PipeSearch">PipeSearch</option>
                    </select>
                </label>
                
                <label>
                Intervention Status:
                    <select value={intervention_status} onChange={handleStatusChange}>
                    <option value="NotStart">Not Started</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>
                Published:
                    <select value={is_published} onChange={handlePublishedChange}>
                    <option value="Published">Published</option>
                    <option value="Not Published">Not Published</option>
                   
                    </select>
                </label>
                </div>
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
