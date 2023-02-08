import React, { useState, useEffect } from "react";
import "./addPipePopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const AddPipePopup = (props) => {

const [addPipe, setAddPipe] = useState(false);


const initialState = '';
  const [coordinatesPipe, setCoordinatesPipe] = useState(initialState);
  


  function getLatLng() {

    const pipeCoordinates= localStorage.getItem("newCoordinates");
    
    setCoordinatesPipe(JSON.parse(pipeCoordinates));
      
    setPipeData({pipe_coordinates : JSON.parse(pipeCoordinates)});
  }
 
  useEffect(() => {
    
        getLatLng();
        }, []);
        window.addEventListener("storage", () => {
            getLatLng();
  });

 const deletePipe = () => {
    window.location.reload();
    localStorage.removeItem("newCoordinates");
  };






  const [pipeData, setPipeData] = useState({
  });



  const handlePipeDataChange = (e) => {
    setPipeData({
      ...pipeData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/pipes/`, pipeData,
      
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
    setAddPipe(false);
    props.handleClose2();
    props.getPipes();
  };





    // //Modal
    const [showPipeModal, setShowPipeModal] = useState(true);

    const handleClosePipeModal = () => setShowPipeModal(false);
    const handleShowPipeModal = () => setShowPipeModal(true);
   

    const OpenPipe = props.openPipe;
    

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenPipe && showPipeModal}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="PipePopup">
        <form>
        <label>Pipe title:</label>
          <input
            type="text"
            name="pipe_title"
            value={pipeData.pipe_title}
            onChange={e => handlePipeDataChange(e)}
          />
          <label>Pipe description:</label>
          <input
            type="text"
            name="pipe_description"
            value={pipeData.pipe_description}
            onChange={e => handlePipeDataChange(e)}
          />
          <label>Pipe coordinates:</label>
          <input
            type="text"
            name="reading_coordinates"
            value={pipeData.pipe_coordinates}
            onChange={e => handlePipeDataChange(e)}
          />
          <label>Pipe creation date:</label>
          <input
            type="datetime-local"
            name="pipe_creation_date"
            value={pipeData.pipe_creation_date}
            onChange={e => handlePipeDataChange(e)}
          />
           <label>Pipe Status:</label>
          <input
            type="text"
            name="pipe_status"
            value={pipeData.pipe_status}
            onChange={e => handlePipeDataChange(e)}
          />

          <label>Pipe Type:</label>
          <input
            type="text"
            name="pipe_type"
            value={pipeData.pipe_type}
            onChange={e => handlePipeDataChange(e)}
          />
          <label>Pipe Length:</label>
          <input
            type="number"
            name="pipe_length"
            value={parseFloat(pipeData.pipe_length)}
            onChange={e => handlePipeDataChange(e)}
          />
          <label>Pipe Diameter:</label>
          <input
            type="number"
            name="pipe_diameter"
            value={parseFloat(pipeData.pipe_diameter)}
            onChange={e => handlePipeDataChange(e)}
          />
          <label>Pipe Material:</label>
          <input
            type="text"
            name="pipe_material"
            value={pipeData.pipe_material}
            onChange={e => handlePipeDataChange(e)}
          />
        
          <label>Map:</label>
          <input
            type="number"
            name="map"
            value={ pipeData.map}
            onChange={e => handlePipeDataChange(e)}
          />
        </form>

       
        <button onClick={handleSubmitData}>Submit</button>
        <button onClick={() => {props.handleClosePipe(); deletePipe();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddPipePopup