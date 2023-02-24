import React, { useState, useEffect } from "react";
import "./addMapPopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const AddMapPopup = (props) => {

const [addMap, setAddMap] = useState(false);


  const initialState = '';
  const [lat, setLat] = useState(initialState);
  const [lng, setLng] = useState(initialState);


  function getLatLng() {
    const lat = localStorage.getItem("newSensorLat");
    const lng = localStorage.getItem("newSensorLng");
   
    
      setLat(lat);
      setLng(lng);
    setMapData({...mapData, map_coordinate : [lng, lat]});
  }
 

  const reloadPage = () => {
  
    window.location.reload();
  };

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



  const [mapData, setMapData] = useState({
    map_title:'',
    map_description: '',
  });



  const handleMapDataChange = (e) => {
    setMapData({
      ...mapData,
      [e.target.name]: e.target.value,
      
    });
  };
  const { map_title, map_description, map_creation_date, map_coordinate } = mapData;
  const handleSubmitData = () => {

    if (!mapData.map_title || !mapData.map_description || !mapData.map_coordinate ) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      map_coordinate, map_creation_date, map_description, map_title
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/maps/`, data,
      
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

    const OpenMap = props.openMap; 

  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenMap}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="MapPopup">
          <h3>Add Map</h3>
        <form>
        <label>Map title:</label>
          <input
            type="text"
            name="map_title"
            value={mapData.map_title}
            onChange={e => handleMapDataChange(e)}
          />

          <label>Map description:</label>
            <textarea type="text"
            name="map_description" value={mapData.map_description} onChange={e => handleMapDataChange(e)} />
          

          <label>Map coordinates:</label>
          <input
          disabled
            type="text"
            name="map_coordinate"
            value={mapData.map_coordinate}
            onChange={e => handleMapDataChange(e)}
          />
          <label>Map creation date:</label>
          <input
            type="datetime-local"
            name="map_creation_date"
            value={mapData.map_creation_date}
            onChange={e => handleMapDataChange(e)}
          />
        </form>
        
        <button onClick={()=>{handleSubmitData();}}>Submit</button>
        <button onClick={()=>{props.handleCloseMap();reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddMapPopup