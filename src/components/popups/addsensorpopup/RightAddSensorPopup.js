import React, { useState, useEffect } from 'react';
import "./RightAddSensorPopup.css"
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const RightAddSensorPopup = (props) => {
  
 
  const style2 = {
    position: 'absolute',
    top: '52%',
    left: '31%',
    transform: 'translate(-50%, -50%)',
    width: '34%',
   height: '96%',
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    overflowY: 'scroll',
    p: 4,
  };
  // const [open2, setOpen2] = React.useState(false);
  // const handleOpen2 = () => setOpen2(true);
  // const handleClose2 = () => setOpen2(false);
  // const handleChange = (e) => {
  //   setSensorData({
  //     ...sensorData,
  //     [e.target.name]: e.target.value
  //   });
  // };


 // add sensor by clicking on the maps and a add sensor details


//  useEffect(() => {
//   setLat(localStorage.getItem("newSensorLat"));
//   setLng(localStorage.getItem("newSensorLng"));

//   console.log("lat :" ,lat);
//   console.log("lng :" ,lng);
// }, [lat, lng]);
  const [addSensor, setAddSensor] = useState(false);

 
 






  const initialState = '';
  const [lat, setLat] = useState(initialState);
  const [lng, setLng] = useState(initialState);


  function getLatLng() {
    const lat = localStorage.getItem("newSensorLat");
    const lng = localStorage.getItem("newSensorLng");
   
    
      setLat(lat);
      setLng(lng);
    setSensorData({sensor_coordinates : [lng, lat]});
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



  const [sensorData, setSensorData] = useState({
  });

const open2 = props.open2;

  const handleSensorDataChange = (e) => {
    setSensorData({
      ...sensorData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/sensors/`, sensorData,
      
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
    setAddSensor(false);
    props.handleClose2();
    // props.getSensors();
    localStorage.removeItem("selectedPipeId");
    window.location.reload();
  };

console.log("sensor frequency", sensorData.sensor_frequency)

  return (
<>
    <Modal
    disableEnforceFocus
    hideBackdrop
    style={{ position: 'initial' }}
    
      open={open2}
     
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
      
        <div>
      
        <div className="sensorPopup">
      <form>
        <label>Sensor coordinates:</label>
        <input
          type="text"
          name="reading_coordinates"
          value={sensorData.sensor_coordinates}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor creation date:</label>
        <input
          type="date"
          name="sensor_creationdate"
          value={sensorData.sensor_creationdate}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor type:</label>
        <input
          type="text"
          name="sensor_type"
          value={sensorData.sensor_type}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor title:</label>
        <input
          type="text"
          name="sensor_title"
          value={sensorData.sensor_title}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor description:</label>
        <input
          type="text"
          name="sensor_description"
          value={sensorData.sensor_description}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor frequency:</label>
        <input
          type="text"
          name="sensor_frequency"
          value={sensorData.sensor_frequency}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor Indication:</label>
        <input
          type="text"
          name="sensor_Indication"
          value={sensorData.sensor_Indication}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Pipe:</label>
        <input
          type="text"
          name="map"
          value={localStorage.getItem('selectedPipeId') ||  sensorData.pipe}
          onChange={e => handleSensorDataChange(e)}
        />
      </form>
      <button onClick={handleSubmitData}>Submit</button>
      <button onClick={props.handleClose2}>Cancel</button>
    </div>
        </div>
      </Box>
    </Modal>

   
    </>
    );
};

export default RightAddSensorPopup