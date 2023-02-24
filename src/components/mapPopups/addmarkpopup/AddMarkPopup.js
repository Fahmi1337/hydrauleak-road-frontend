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
    setMarkData({...markData, mark_coordinates : [lng, lat], pipe : localStorage.getItem('selectedPipeId')});

   
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
    

    mark_description: '', 
    mark_title : '', 
   
  });
  const { mark_coordinates, mark_creation_date, mark_description, mark_title, pipe } = markData;
  

  const handleMarkDataChange = (e) => {
    setMarkData({
      ...markData,
      [e.target.name]: e.target.value,
      
    });
  };




console.log("mark data?", markData)
  const handleSubmitData = () => {

    

    if (!markData.mark_title || !markData.mark_description || !markData.mark_coordinates || !markData.pipe) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      mark_coordinates, mark_creation_date, mark_description, mark_title, pipe
    };

  

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/marks/`, data,
      
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
  
    // reloadPage();
    
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
          <h3>Add Mark</h3>
        <form>

       
          <label>Mark coordinates:</label>
          <input
          disabled
          required
            type="text"
            name="reading_coordinates"
            value={markData.mark_coordinates}
            onChange={e => handleMarkDataChange(e)}
          />

        <label>Pipe:</label>
          <input
          disabled
          required
            type="text"
            name="pipe"
            value={localStorage.getItem('selectedPipeId') || markData.pipe}
            onChange={e => handleMarkDataChange(e)}
          />

        <label>Mark title:</label>
          <input
            type="text"
            name="mark_title"
            value={markData.mark_title}
            onChange={e => handleMarkDataChange(e)}
          />

        <label>Mark description:</label>
            <textarea value={markData.mark_description} onChange={e => handleMarkDataChange(e)} />

          <label>Mark creation date:</label>
          <input
          required
            type="datetime-local"
            name="mark_creation_date"
            value={markData.mark_creation_date}
            onChange={e => handleMarkDataChange(e)}
          />
          
                    
          <label>Image:</label>
          <input type="file"  />
          
          
          
        </form>
        <button onClick={()=>{handleSubmitData();}}>Submit</button>
        <button  onClick={()=>{props.handleCloseMark();reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddMarkPopup