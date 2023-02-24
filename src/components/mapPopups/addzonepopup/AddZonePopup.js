import React, { useState, useEffect } from "react";
import "./addZonePopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const AddZonePopup = (props) => {


const initialState = '';
const [addZone, setAddZone] = useState(false);
const [zoneData, setZoneData] = useState({
  zone_title: '',
  zone_description: '',
zone_area: parseFloat(localStorage.getItem("zoneArea")),
  zone_date: '',
  zone_status: 'notStart',
  zone_color: 'orange',
  zone_coordinates: '',
  map: 1
});
const { zone_title, zone_description, zone_num, zone_date, zone_status, zone_color, map } = zoneData;


//get Zone Area Start
const [AreaZone, setZoneArea] = useState(initialState);

function getZoneArea() {

  const zoneArea = localStorage.getItem("zoneArea");
  
  setZoneArea(zoneArea);
    
  setZoneData({...zoneData, zone_area : zoneArea});
  console.log("zoneData zone_area ", zoneData.zone_area)
  console.log(" zoneArea ", zoneArea)

}

useEffect(() => {
  
  getZoneArea();
      }, [AreaZone]);


      window.addEventListener("zoneAreaStorage", () => {
        getZoneArea();
});

//get Zone Area end






  const [zone_coordinates, setCoordinatesZone] = useState(initialState);
  

  function getLatLng() {

    const zoneCoordinates= localStorage.getItem("newZoneCoordinates");
    
    setCoordinatesZone(JSON.parse(zoneCoordinates));

    
      
    setZoneData({...zoneData, zone_coordinates : JSON.parse(zoneCoordinates)});
  }
 
  useEffect(() => {
    
        getLatLng();
        
        }, []);
        window.addEventListener("zoneStorage", () => {
            getLatLng();
  });
 




 const deleteZone = () => {
    window.location.reload();
    localStorage.removeItem("newZoneCoordinates");
  };



  



  const handleZoneDataChange = (e) => {
    setZoneData({
      ...zoneData,
      [e.target.name]: e.target.value,
      
    });

  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/zones/`,  { zone_title, zone_description, zone_num, zone_date, zone_status, zone_color, map, AreaZone, zone_coordinates },
      
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
 
 
  
  };


  const handleZoneSubmitButton = (e) => {
    e.preventDefault();
    // props.handlePolygonCreated(); 
    handleSubmitData(); 
    // deleteZone();
    props.handleCloseZone();
   
  }


    // //Modal
    const [showZoneModal, setShowZoneModal] = useState(true);

    const handleCloseZoneModal = () => setShowZoneModal(false);
    const handleShowZoneModal = () => setShowZoneModal(true);
   

    const OpenZone = props.openZone;
    

console.log("zone coordinates", zoneData.zone_coordinates)

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

console.log("zonedata?", zoneData)

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
          <h3>Add Zone</h3>
       
        <form>

        <div className='listinform__section'>
            <label >Map:</label>        
             
            <select  type="text"  
                  name="map" onChange={e => handleZoneDataChange(e)} value={zoneData.map || 1} > <option disabled selected value> -- select an option -- </option>
                  {maps.data?.map(map => (
                    
                  <option key={map.id} value={map.id}>{map.map_title}</option>          
                  ))} 
            </select>
            
        </div>

    
        <label>Zone coordinates:</label>
          <input
          disabled
            type="text"
            name="reading_coordinates"
            value={zoneData.zone_coordinates}
            onChange={e => handleZoneDataChange(e)}
          />

<label>Zone area in km2:</label>
          <input
          disabled
            type="text"
            name="zone_area"
            value={parseFloat(AreaZone)}
            onChange={e => handleZoneDataChange(e)}
          />
        <label>Zone title:</label>
          <input
            type="text"
            name="zone_title"
            value={zoneData.zone_title}
            onChange={e => handleZoneDataChange(e)}
          />

          <label>Zone description:</label>
            <textarea type="text" name="zone_description" value={zoneData.zone_description} onChange={e => handleZoneDataChange(e)} />


          <label>Zone creation date:</label>
          <input
            type="datetime-local"
            name="zone_date"
            value={zoneData.zone_date}
            onChange={e => handleZoneDataChange(e)}
          />
           
          <label>Zone Status:</label>
              <select type="text" name="zone_status"
                value={zoneData.zone_status}
                onChange={e => handleZoneDataChange(e)}>
              <option value="notStart">Not Started</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              </select>

          <label>Zone Color:</label>
              <select type="text" name="zone_color"
                value={zoneData.zone_color}
                onChange={e => handleZoneDataChange(e)}>
                  <option value="orange">Orange</option>
              <option value="green">Green</option>
              
              <option value="red">Red</option>
              </select>

          

        

        </form>

         {/* <button onClick={() => {props.handlePolygonCreated(); handleSubmitData(); deleteZone();}}>Submit</button>*/}
        {/* <button onClick={() => {props.handlePolygonCreated(); }}>Submit</button>  */}
        <button onClick={handleZoneSubmitButton}>Submit</button> 
        <button onClick={() => {props.handleCloseZone(); deleteZone();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddZonePopup