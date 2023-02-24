import React, { useState, useEffect } from "react";
import "./addpipeaccesspopup.css";
import axios from 'axios';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const AddPipeAccessPopup = (props) => {

const [addPipeAccess, setAddPipeAccess] = useState(false);


  const initialState = '';
  const [lat, setLat] = useState(initialState);
  const [lng, setLng] = useState(initialState);


  function getLatLng() {
    const lat = localStorage.getItem("newSensorLat");
    const lng = localStorage.getItem("newSensorLng");
   
    
      setLat(lat);
      setLng(lng);
    setPipeAccessData({...pipeAccessData, pipe_access_coordinates : [lng, lat], pipe : localStorage.getItem('selectedPipeId')});
    // setPipeAccessData({pipe : localStorage.getItem('selectedPipeId')});
  }
 

 

  useEffect(() => {
    getLatLng();
  }, []);
  window.addEventListener("storage", () => {
    getLatLng();
  });
  useEffect(() => {
    if (lat !== initialState) {
      localStorage.setItem("newSensorLat", lat);
    }
  }, [lng, lat]);



  const [pipeAccessData, setPipeAccessData] = useState({
  });



  const handlePipeAccessDataChange = (e) => {
    setPipeAccessData({
      ...pipeAccessData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/pipeacces/`, pipeAccessData,
      
      {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +   localStorage.getItem("token")
  }}
  
  )    
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setAddPipeAccess(false);
 props.handleClosePipeAccess();
 
  };





    // //Modal
    const [showPipeAccessModal, setShowPipeAccessModal] = useState(true);

    const handleClosePipeAccessModal = () => setShowPipeAccessModal(false);
    const handleShowPipeAccessModal = () => setShowPipeAccessModal(true);
   

    const OpenPipeAccess = props.openPipeAccess;
    
    const reloadPage = () => {
        window.location.reload();
      };

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenPipeAccess && showPipeAccessModal}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="PipeAccessPopup">
          <h3>Add Pipe Access</h3>
        <form>
                            
        <label>Pipe:</label>
          <input
          disabled
            type="text"
            name="pipe"
            value={localStorage.getItem('selectedPipeId') ||  pipeAccessData.pipe}
            onChange={e => handlePipeAccessDataChange(e)}
          />
                 
        <label>Pipe Access coordinates:</label>
          <input
          disabled
            type="text"
            name="reading_coordinates"
            value={pipeAccessData.pipe_access_coordinates}
            onChange={e => handlePipeAccessDataChange(e)}
          />

        <label>Pipe Access title:</label>
          <input
            type="text"
            name="pipe_access_title"
            value={pipeAccessData.pipe_access_title}
            onChange={e => handlePipeAccessDataChange(e)}
          />

          <label>Pipe Access description:</label>
            <textarea value={pipeAccessData.pipe_access_description} onChange={e => handlePipeAccessDataChange(e)} />
          


          <label>Pipe Access Type:</label>
                    <select type="text" value={pipeAccessData.pipe_access_type} onChange={e => handlePipeAccessDataChange(e)}>
                    <option value="HouseValve">House Valve</option>
                    <option value="FirePole">Fire Pole</option>
                    <option value="FireHydrantValve">Fire Hydrant Valve</option>
                    <option value="Other">Other</option>
                    </select>


        </form>
        <button onClick={()=>{handleSubmitData(); reloadPage();}}>Submit</button>
        <button onClick={()=>{props.handleClosePipeAccess();reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddPipeAccessPopup