import React, { useState, useEffect } from "react";
import "./addZonePopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const AddZonePopup = (props) => {

const [addZone, setAddZone] = useState(false);



// const initialState = '';
//   const [coordinatesZone, setCoordinatesZone] = useState(initialState);
  

//   function getLatLng() {

//     const zoneCoordinates= localStorage.getItem("newZoneCoordinates");
    
//     setCoordinatesZone(JSON.parse(zoneCoordinates));

    
      
//     setAddZone({zone_coordinates : JSON.parse(zoneCoordinates)});
//   }
 
//   useEffect(() => {
    
//         getLatLng();
        
//         }, []);
//         window.addEventListener("storage", () => {
//             getLatLng();
//   });
//   console.log("Zone coordinates", coordinatesZone)




 const deleteZone = () => {
    window.location.reload();
    // localStorage.removeItem("newZoneCoordinates");
  };



  const [zoneData, setZoneData] = useState({
  });



  const handleZoneDataChange = (e) => {
    setZoneData({
      ...zoneData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/zones/`, zoneData,
      
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
    setAddZone(false);
    props.handleClose2();
    props.getZones();
  };





    // //Modal
    const [showZoneModal, setShowZoneModal] = useState(true);

    const handleCloseZoneModal = () => setShowZoneModal(false);
    const handleShowZoneModal = () => setShowZoneModal(true);
   

    const OpenZone = props.openZone;
    



  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenZone && showZoneModal}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="ZonePopup">
        <form>
        <label>Zone title:</label>
          <input
            type="text"
            name="zone_title"
            value={zoneData.zone_title}
            onChange={e => handleZoneDataChange(e)}
          />
          <label>Zone description:</label>
          <input
            type="text"
            name="zone_description"
            value={zoneData.zone_description}
            onChange={e => handleZoneDataChange(e)}
          />
          {/* <label>Zone coordinates:</label>
          <input
            type="text"
            name="reading_coordinates"
            value={zoneData.zone_coordinates}
            onChange={e => handleZoneDataChange(e)}
          /> */}
          <label>Zone creation date:</label>
          <input
            type="datetime-local"
            name="zone_creation_date"
            value={zoneData.zone_creation_date}
            onChange={e => handleZoneDataChange(e)}
          />
           <label>Zone Status:</label>
          <input
            type="text"
            name="zone_status"
            value={zoneData.zone_status}
            onChange={e => handleZoneDataChange(e)}
          />

          <label>Zone Color:</label>
          <input
            type="text"
            name="zone_color"
            value={zoneData.zone_color}
            onChange={e => handleZoneDataChange(e)}
          />
          <label>Zone area:</label>
          <input
            type="number"
            name="zone_area"
            value={parseFloat(zoneData.zone_area)}
            onChange={e => handleZoneDataChange(e)}
          />
        
          <label>Map:</label>
          <input
            type="number"
            name="map"
            value={ zoneData.map}
            onChange={e => handleZoneDataChange(e)}
          />
        </form>

       
        {/* <button onClick={() => {props.handlePolygonCreated(); handleSubmitData(); deleteZone();}}>Submit</button> */}
        <button onClick={props.handlePolygonCreated}>Submit</button> 
        <button onClick={() => {props.handleCloseZone(); deleteZone();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddZonePopup