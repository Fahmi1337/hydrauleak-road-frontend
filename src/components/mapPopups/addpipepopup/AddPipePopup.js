import React, { useState, useEffect } from "react";
import "../../../assets/css/ContributesPopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const AddPipePopup = (props) => {

// const [addPipe, setAddPipe] = useState(false);


const [pipeData, setPipeData] = useState({
  
  pipe_diameter:"0",
  pipe_material:"undefined",
  pipe_status:"unknown",
  pipe_type:"undefined",
  map: "3",

});
const { pipe_creation_date, pipe_description, pipe_diameter, pipe_length, pipe_type, pipe_title, pipe_material, pipe_status,pipe_coordinates, map } = pipeData;
const handlePipeDataChange = (e) => {
  setPipeData({
    ...pipeData,
    [e.target.name]: e.target.value,
    
  });
};
   //get Pipe Coordinates
 
   const pipeCoordinates = props.pipeCoordinates
   const pipeLength = props.pipeLength
 
   useEffect(() => {
     setPipeData({ ...pipeData,
       pipe_coordinates: pipeCoordinates,
       pipe_length: pipeLength
     }
       
     );
   }, [pipeCoordinates,pipeLength]);

//get Pipe Coordinates


 console.log("pipeData?", pipeData)


const handleSubmitData = () => {
  // Check if the required fields are not empty
  if (!pipeData.pipe_title || !pipeData.pipe_description|| !pipeData.pipe_length|| !pipeData.pipe_coordinates|| !pipeData.map) {
    alert("Please fill in all required fields.");
    return;
  }

  // Send the data to the server
  const data = {
    pipe_creation_date,
    pipe_description,
    pipe_diameter,
    pipe_length,
    pipe_type,
    pipe_title,
    pipe_material,
    pipe_status,
    pipe_coordinates,
    map,
  };
   
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/pipes/`, data,
      
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
  
   
    deletePipe();
    
  };

  const deletePipe = () => {
 
    window.location.reload();
    localStorage.removeItem("newCoordinates");
    localStorage.removeItem("pipeLength");
    props.handleClosePipe();
    
  };


    const OpenPipe = props.openPipe;
    

    const [maps, setMaps] = useState([]);

    const getMaps = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/maps/`,
          {
            method: "GET",
    
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((response) => response.json())
          .then((data) => setMaps(data));
    return response;
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {   
      getMaps();  
          }, []);

console.log("maps details", maps)

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenPipe }
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="contributesPopup">
          <h1>Add Pipe</h1>
          <h2>Please make sure to zoom in as much as possible on the map before selecting a location to add a pipeline. 
            This will ensure that you get the most accurate coordinates for the pipeline's placement.</h2>
        <form>

        <div className='listinform__section'>
            <label >Map Center *</label>         
            <select  type="text"
                  name="map" onChange={e => handlePipeDataChange(e)} value={pipeData.map}>
                  {maps.data?.map(map => (
                  <option key={map.id} value={map.id}>{map.map_title}</option>          
                  ))} 
            </select>
        </div>

          <label>Pipe coordinates *</label>
          <input
          disabled
          
            type="text"
            name="pipe_coordinates"
            value={pipeData.pipe_coordinates}
            onChange={e => handlePipeDataChange(e)}
          />
          
          <label>Pipe Length *</label>
          <input
          disabled
          
            type="number"
            name="pipe_length"
            value={pipeData.pipe_length}
            onChange={e => handlePipeDataChange(e)}
            
          />

        <label>Pipe title *</label>
          <input
          
            type="text"
            name="pipe_title"
            value={pipeData.pipe_title}
            onChange={e => handlePipeDataChange(e)}
            required
          />

          <label>Pipe description *</label>
            <textarea type="text" name="pipe_description" value={pipeData.pipe_description} onChange={e => handlePipeDataChange(e)} required/>

          <label>Pipe creation date</label>
          <input
            type="datetime-local"
            name="pipe_creation_date"
            value={pipeData.pipe_creation_date}
            onChange={e => handlePipeDataChange(e)}
          />

          <label>Pipe Status</label>
                    <select type="text" name="pipe_status" value={pipeData.pipe_status} onChange={e => handlePipeDataChange(e)} >
                    <option value="good">Good</option>
                    <option value="unknown">Unknown</option>
                    <option value="critical">Critical</option>
                    </select>

          
          <label>Pipe Type</label>
          <input
            type="text"
            name="pipe_type"
            value={pipeData.pipe_type}
            onChange={e => handlePipeDataChange(e)}
            required
          />

          <label>Pipe Diameter</label>
          <input
            type="number"
            name="pipe_diameter"
            value={parseFloat(pipeData.pipe_diameter)}
            onChange={e => handlePipeDataChange(e)}
            required
          />
          <label>Pipe Material</label>
          <input
            type="text"
            name="pipe_material"
            value={pipeData.pipe_material}
            onChange={e => handlePipeDataChange(e)}
            required
          />
        

        </form>

        <div className='formButtonsContainer'>
                <button onClick={handleSubmitData}>Submit</button>
                <button onClick={() => {props.handleClosePipe(); deletePipe();}}>Cancel</button>
              </div>       

      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddPipePopup