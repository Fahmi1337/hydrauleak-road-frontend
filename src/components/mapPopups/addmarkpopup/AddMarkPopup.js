import React, { useState, useEffect } from "react";
import "./addMarkPopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const AddMarkPopup = (props) => {


  const arrivedCoordinates = props.mapClickedCoordinates

  const initialState = '';


  const [markData, setMarkData] = useState({
    

    mark_description: '', 
    mark_title : '', 
   
  });


  
  useEffect(() => {
    setMarkData(prevMarkData => ({
      ...prevMarkData,
      mark_coordinates: arrivedCoordinates,
      pipe: localStorage.getItem('selectedPipeId')
    }));
  }, [arrivedCoordinates]);

  // useEffect(() => {
  //   setMarkData({...markData,  pipe: localStorage.getItem('selectedPipeId')});
  // }, [markData]);


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

    
  
    reloadPage();
    
  };





    // //Modal
  
   

    const OpenMark = props.openMark;
    

    const reloadPage = () => {
      props.handleCloseMark();
      localStorage.removeItem("selectedPipeId");    
      
    };

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenMark}
       
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
            <textarea   type="text"
            name="mark_description" value={markData.mark_description} onChange={e => handleMarkDataChange(e)} />

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
        <button onClick={()=>{props.handleCloseMark();reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddMarkPopup