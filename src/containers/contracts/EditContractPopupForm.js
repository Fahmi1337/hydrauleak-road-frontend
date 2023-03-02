import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const EditContractPopupForm =({ contract, onUpdateContract, onCancel, onOpen, getContracts }) => {
  // const [contract, setContract] = useState(contract.contract);
  // const [leaker, setLeaker] = useState(contract.leaker);
  
  const [contract_title, setTitle] = useState(contract.contract_title);
  const [contract_description, setDescription] = useState(contract.contract_description);
  const [address, setAddress] = useState(contract.address);
  const [city, setCity] = useState(contract.city);
  const [state, setState] = useState(contract.state);
  const [zipcode, setZipCode] = useState(contract.zipcode);
  const [leakTool, setLeakTool] = useState(contract.contract_leak_tool);
  const [contract_date, setDate] = useState(contract.contract_date);  
  const [contract_estimate_end_date, setEstimateTime] = useState(contract.contract_estimate_end_date);
 
  const [contract_work_type, setType] = useState(contract.contract_work_type);
  const [size, setSize] = useState(contract.city_size);
  const [contract_status, setStatus] = useState(contract.contract_status);
  const [is_published, setPublished] = useState(contract.is_published);
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    
    transform: 'translate(-50%, -50%)',
   
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };

  // const handleContractChange = (event) => {
  //   setContract(event.target.value);
  // };

  // const handleLeakerChange = (event) => {
  //   setLeaker(event.target.value);
  // };

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
    const updatedContract = {
      ...contract,
      // contract, 
      // leaker, 
      contract_title,
      contract_description,
      contract_work_type, 
      size, 
      contract_status, 
      contract_date, 
      address, 
      city, 
      state, 
      zipcode, 
      contract_estimate_end_date, 
      leakTool, 
      is_published, 
    };
    onUpdateContract(updatedContract);
    getContracts();
    onCancel(); // close the modal on successful form submission
    getContracts();
    getContracts();
  };


  

  return (

    <>

    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={onOpen}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-contract_description"
      >
        <Box sx={style}>
            <div className="popup-form">
            <div className="popup-form-overlay" onClick={onCancel}></div>
            <div className="popup-form-content">
                <h2>Edit Contract</h2>
                <form onSubmit={handleSubmit}>
                <label>
                Contract work type:
                    <select value={contract_work_type} onChange={handleTypeChange}>
                    <option value="Fire_Hydrant_Inspection">Fire Hydrant Inspection</option>
                    <option value=" All_City_Inspections">All City Inspections</option>
                    <option value="Clarifying_the_location_of_the_leak">Clarifying the location of the leak</option>
                    <option value="Solve_high_consumption_problem_but_the_leak_is_not_identified">Solve high consumption problem but the leak is not identified</option>
                    </select>
                </label>
                
                <label>
                Contract Status:
                    <select value={contract_status} onChange={handleStatusChange}>
                    <option value="NotStart">Not Started</option>
                    <option value="Pending">Pending</option>
                    <option value="expired">Expired</option>
                    </select>
                </label>
                <label>
                title:
                    <input type="text" value={contract_title} onChange={handleTitleChange} />
                </label>
                <label>
                Contract description:
                    <input type="text" value={contract_description} onChange={handleDescriptionChange} />
                </label>
                <label>
                Start date:
                    <input type="date" value={contract_date} onChange={handleDateChange} />
                </label>
                <label>
                estimate Time:
                    <input type="date" value={contract_estimate_end_date} onChange={handleEstimateTimeChange} />
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
                Published:
                    <select value={is_published} onChange={handlePublishedChange}>
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

export default EditContractPopupForm;
