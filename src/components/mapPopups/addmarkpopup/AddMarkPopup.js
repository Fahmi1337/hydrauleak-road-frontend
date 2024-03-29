import React, { useState, useEffect } from "react";
import "../../../assets/css/ContributesPopup.css"
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




// console.log("mark data?", markData)
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
    window.location.reload();
  };





    // //Modal
  
   

    const OpenMark = props.openMark;
    

    const reloadPage = () => {
      if(props.selectedReport){
      props.handleCancelAddMarkReport();
    }
      props.handleCloseMark();  
      localStorage.removeItem("selectedPipeId");    
     
      // window.location.reload();
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
        
        <div className="contributesPopup">
          <h1>Add Mark</h1>
          <h2>Please make sure to zoom in as much as possible on the pipe's location before selecting the placement for the mark.
          This will ensure that you get the most accurate coordinates for the Mark placement.
          </h2>
        <form>

       
          <label>Mark coordinates *</label>
          <input
          disabled
          
            type="text"
            name="reading_coordinates"
            value={markData.mark_coordinates}
            onChange={e => handleMarkDataChange(e)}
            required
          />

        <label>Pipe *</label>
          <input
          disabled
          
            type="text"
            name="pipe"
            value={localStorage.getItem('selectedPipeId') || markData.pipe}
            onChange={e => handleMarkDataChange(e)}
            required
          />

        <label>Mark title *</label>
          <input
            type="text"
            name="mark_title"
            value={markData.mark_title}
            onChange={e => handleMarkDataChange(e)}
            required
          />

        <label>Mark description *</label>
            <textarea   type="text"
            name="mark_description" value={markData.mark_description} onChange={e => handleMarkDataChange(e)} required />

          <label>Mark creation date</label>
          <input
          
            type="datetime-local"
            name="mark_creation_date"
            value={markData.mark_creation_date}
            onChange={e => handleMarkDataChange(e)}
          />
          
                    
          <label>Image</label>
          <input type="file"  />
          
          
          
        </form>

        <div className='formButtonsContainer'>
          <button onClick={()=>{handleSubmitData();}}>Submit</button>
          <button onClick={reloadPage}>Cancel</button>
        </div>
      
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddMarkPopup