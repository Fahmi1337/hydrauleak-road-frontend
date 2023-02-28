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
  
  zone_status: 'notStart',
  zone_color: 'orange',
  zone_coordinates: '',
  map: 1
});
const style = {

  zIndex: 999999999999
};
const { zone_title, zone_description, zone_num, zone_status, zone_color, map, AreaZone, zone_coordinates } = zoneData;


//get Zone Area Start
// const [zoneArea, setZoneArea] = useState(initialState);

// function getZoneArea() {

//   const zoneArea = localStorage.getItem("zoneArea");
  
//   setZoneArea(zoneArea);
    
//   setZoneData({...zoneData, zone_area : zoneArea});
//   console.log("zoneData zone_area ", zoneData.zone_area)
//   console.log(" zoneArea ", zoneArea)

// }

// useEffect(() => {
  
//   getZoneArea();
//       }, [AreaZone]);


//       window.addEventListener("zoneAreaStorage", () => {
//         getZoneArea();
// });

//get Zone Area end






  const [coordinatesZone, setCoordinatesZone] = useState(initialState);
  

  function getLatLng() {

    const zoneCoordinates= localStorage.getItem("newZoneCoordinates");
    
    setCoordinatesZone(JSON.parse(zoneCoordinates));

    
      
    setZoneData({...zoneData, zone_coordinates : JSON.parse(zoneCoordinates), zone_area: localStorage.getItem("zoneArea")});
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
    localStorage.removeItem("zoneArea");
  };



  



  const handleZoneDataChange = (e) => {
    setZoneData({
      ...zoneData,
      [e.target.name]: e.target.value,
      
    });

  };

  const handleSubmitData = () => {
    if (!zoneData.zone_title || !zoneData.zone_description || !zoneData.zone_coordinates) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      zone_title, zone_description, zone_num, zone_status, zone_color, map, AreaZone, zone_coordinates
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/zones/`,  data,
      
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
 
      deleteZone();
      props.handleCloseZone();
  };


  // const handleZoneSubmitButton = () => {  
  //   handleSubmitData(); 
    
  //   props.handleCloseZone();
   
  // }


    // //Modal

    const OpenZone = props.openZone;

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




      const [interventions, setInterventions] = useState([]);

const getInterventions = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/interventions/`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setInterventions(data));
return response;
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {   
  getInterventions();  
      }, []);
   
console.log("props.interventionId", props.selectedIntervention)
  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenZone}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
        <div className="ZonePopup">
          <h3>Add Zone</h3>
       
        <form>




        <div className='listinform__section'>
            <label >Intervention :</label>        
             
            <select  type="text"  
                  name="intervention" onChange={e => handleZoneDataChange(e)} value={zoneData.intervention || props.selectedIntervention.id} > <option disabled selected value> -- select an option -- </option>
                  {interventions?.map(intervention => (
                    
                  <option key={intervention.id} value={intervention.id}>{intervention.intervention_title}</option>          
                  ))} 
            </select>
            
        </div>



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
            value={parseFloat(localStorage.getItem("zoneArea")) || parseFloat(zoneData.zone_area)}
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


          {/* <label>Zone creation date:</label>
          <input
            type="datetime-local"
            name="zone_date"
            value={zoneData.zone_date}
            onChange={e => handleZoneDataChange(e)}
          /> */}
           
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


        <button onClick={handleSubmitData}>Submit</button> 
        <button onClick={() => {props.handleCloseZone(); deleteZone();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddZonePopup