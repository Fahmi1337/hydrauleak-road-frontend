import React, { useState, useEffect } from "react";
import "./addMarkPopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const AddMarkPopup = (props) => {

const [addMark, setAddMark] = useState(false);


  const initialState = '';
  const [lat, setLat] = useState(initialState);
  const [lng, setLng] = useState(initialState);


  function getLatLng() {
    const lat = localStorage.getItem("newSensorLat");
    const lng = localStorage.getItem("newSensorLng");
   
    
      setLat(lat);
      setLng(lng);
    setMarkData({mark_coordinates : [lng, lat]});

    // setMarkData({zone_coordinates : localStorage.getItem('selectedPipeId')});
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



  const [markData, setMarkData] = useState({
  });

  

  const handleMarkDataChange = (e) => {
    setMarkData({
      ...markData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/marks/`, markData,
      
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
    setAddMark(false);
  
   
    
  };





    // //Modal
    const [showMarkModal, setShowMarkModal] = useState(true);

    const handleCloseMarkModal = () => setShowMarkModal(false);
    const handleShowMarkModal = () => setShowMarkModal(true);
   

    const OpenMark = props.openMark;
    

    const reloadPage = () => {
      window.location.reload();
    };

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenMark && showMarkModal}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="MarkPopup">
        <form>
        <label>Mark title:</label>
          <input
            type="text"
            name="mark_title"
            value={markData.mark_title}
            onChange={e => handleMarkDataChange(e)}
          />
          <label>Mark description:</label>
          <input
            type="text"
            name="mark_description"
            value={markData.mark_description}
            onChange={e => handleMarkDataChange(e)}
          />
          <label>Mark coordinates:</label>
          <input
            type="text"
            name="reading_coordinates"
            value={markData.mark_coordinates}
            onChange={e => handleMarkDataChange(e)}
          />
          <label>Mark creation date:</label>
          <input
            type="datetime-local"
            name="mark_creation_date"
            value={markData.mark_creation_date}
            onChange={e => handleMarkDataChange(e)}
          />
          
          
          
          <label>Pipe:</label>
          <input
            type="text"
            name="pipe"
            value={localStorage.getItem('selectedPipeId') || markData.pipe}
            onChange={e => handleMarkDataChange(e)}
          />
        </form>
        <button onClick={()=>{handleSubmitData();reloadPage();}}>Submit</button>
        <button  onClick={()=>{props.handleCloseMark();reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddMarkPopup