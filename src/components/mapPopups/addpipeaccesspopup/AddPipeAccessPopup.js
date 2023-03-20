import React, { useState, useEffect } from "react";
import "./addPipeAccessPopup.css";
import axios from 'axios';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const AddPipeAccessPopup = (props) => {



  const arrivedCoordinates = props.mapClickedCoordinates
  const initialState = '';

  const [pipeAccessData, setPipeAccessData] = useState({
    pipe_access_description:'',
    pipe_access_title:'',
    pipe_access_type:'HouseValve'
  });

  useEffect(() => {
    setPipeAccessData(prevPipeAccessData => ({
      ...prevPipeAccessData,
      pipe_access_coordinates: arrivedCoordinates,
      pipe: localStorage.getItem('selectedPipeId')
    }));
  }, [arrivedCoordinates]);


  const { pipe_access_description, pipe_access_title, pipe_access_type, pipe_access_coordinates, pipe } = pipeAccessData;

  const handlePipeAccessDataChange = (e) => {
    setPipeAccessData({
      ...pipeAccessData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleSubmitData = () => {
    if (!pipeAccessData.pipe_access_title || !pipeAccessData.pipe_access_description || !pipeAccessData.pipe_access_coordinates || !pipeAccessData.pipe) {
      alert("Please fill in all required fields.");
      return;
    }

  const data = {
    pipe_access_description, pipe_access_title, pipe_access_type, pipe_access_coordinates, pipe
  };

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/pipeacces/`, data,
    
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

reloadPage();

  };





    // //Modal
   
    const OpenPipeAccess = props.openPipeAccess;
    
    const reloadPage = () => {
    
      
      localStorage.removeItem("selectedPipeId");
      localStorage.removeItem("newSensorLng");
      localStorage.removeItem("newSensorLat");
      props.handleClosePipeAccess();
      };

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenPipeAccess}
       
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
            name="pipe_access_coordinates"
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
            <textarea  type="text"
            name="pipe_access_description" value={pipeAccessData.pipe_access_description} onChange={e => handlePipeAccessDataChange(e)} />
          


          <label>Pipe Access Type:</label>
                    <select type="text" name="pipe_access_type" value={pipeAccessData.pipe_access_type} onChange={e => handlePipeAccessDataChange(e)}>
                    <option value="HouseValve">House Valve</option>
                    <option value="FirePole">Fire Pole</option>
                    <option value="FireHydrantValve">Fire Hydrant Valve</option>
                    <option value="Other">Other</option>
                    </select>


        </form>
        <button onClick={()=>{handleSubmitData();}}>Submit</button>
        <button onClick={()=>{props.handleClosePipeAccess(); reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddPipeAccessPopup