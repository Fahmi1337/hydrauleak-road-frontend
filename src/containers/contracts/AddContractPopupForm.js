import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
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
const AddContractPopupForm = ({ onCancel, onOpen }) => {
  const [contractData, setContractData] = useState({
   
    // contract: 1, 
      client: 2,
    // contract_title: '',
    // contract_description: '',
    address: '', 
    city: '', 
    state: '', 
    zipcode: '', 
     
      contract_status: 'NotStart', 
      // contract_date: '', 
       
      is_published: 'Not Published'
  });

  const handleContractDataChange = (e) => {
    const value = e.target.name === 'client' ? parseInt(e.target.value) : e.target.value;
    setContractData({
      ...contractData,
      [e.target.name]: value,
    });
  };
  

  const handleSubmitData = (e) => {
    e.preventDefault(); // prevent the default form submission
    axios.post(`${process.env.REACT_APP_API_URL}/api/contracts/`, contractData, {
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

  const [clients, setClients] = useState([]);
 console.log("the client data :", clients.map((client) => (client.id))  )
 console.log("the contract data :", contractData  )
  const getClients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/clients/`,
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
          <div className="add-popup-form">
            {/* <div className="popup-form-overlay" onClick={onCancel}></div> */}
            <div className="popup-form-content">
              <h2>Add Contract</h2>
              <form onSubmit={handleSubmitData}>
                <div className="popup-form add-popup-form">
                 <label>
                 Select Client:
                </label>
                <select type='number' name="client" value={contractData.client} onChange={handleContractDataChange}>
                <option disabled value=""> -- select an option -- </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.user.name}
                  </option>
                ))}
              </select>

            <label>
                Contract status:
                    <select type="text" name='contract_status'  value={contractData.contract_status} onChange={handleContractDataChange} required>
                    <option value="NotStart">Not Started</option>
                    <option value="Pending">Pending</option>
                    <option value="expired">expired</option>
                    </select>
                </label>

                <label>
                Contract work type:
                    <select  type="text" name='contract work type' value={contractData.contract_work_type} onChange={handleContractDataChange} required>                   
                    <option value="Fire Hydrant Inspection">Fire Hydrant Inspection</option>
                    <option value=" All City Inspections">All City Inspections</option>
                    <option value="Clarifying the location of the leak">Clarifying the location of the leak</option>
                    <option value="Solve high consumption problem but the leak is not identified">Solve high consumption problem but the leak is not identified</option>
                    </select>
                </label>
                {/*
                <label>
                leaker:
                    <input type="email" name='leaker' value={contractData.leaker} onChange={handleContractDataChange} />
                </label>
                <label>
                map:
                    <input type="text" name='map' value={contractData.map} onChange={handleContractDataChange} />
                </label> */}
                <label>
                Title:
                    <input type="text" name='contract_title' value={contractData.contract_title} onChange={handleContractDataChange}  required />
                </label>
                <label>
                Description:
                    <textarea type="text" name='contract_description' value={contractData.contract_description} onChange={handleContractDataChange} required />
                </label>
                <label>
                Start Date:
                    <input type="date" name='contract_date' value={contractData.contract_date} onChange={handleContractDataChange} required/>
                </label>
                <label>
                Estimate Time:
                    <input type="date" name='contract_estimate_end_date' value={contractData.contract_estimate_end_date} onChange={handleContractDataChange} required/>
                </label>
                
                <label>
                Address:
                    <input type="text" name='address' value={contractData.address} onChange={handleContractDataChange} />
                </label>
                <label>
                City:
                    <input type="text" name='city' value={contractData.city} onChange={handleContractDataChange} />
                </label>
                <label>
                State:
                    <input type="text" name='state' value={contractData.state} onChange={handleContractDataChange} />
                </label>
                <label>
                ZipCode:
                    <input type="text" name='zipcode' value={contractData.zipcode} onChange={handleContractDataChange} />
                </label>
                
                
                
                {/* <label>
                City size:
                    <select value={contractData.size} onChange={handleContractDataChange}>
                    <option value="BigCity">BigCity</option>
                    <option value="MediumCity">MediumCity</option>
                    <option value="LittleCity">LittleCity</option>
                    </select>
                </label> */}
                
                <label>
                Published:
                    <select  type="text" name='is_published' value={contractData.is_published} onChange={handleContractDataChange} required>
                    <option value="Not Published">Not Published</option>
                    <option value="Published">Published</option>
                    
                   
                    </select>
                </label>
                </div>
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

export default AddContractPopupForm;
