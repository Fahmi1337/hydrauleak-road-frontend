import React, { useState, useEffect } from 'react';
import "./RightAddSensorPopup.css"
import axios from 'axios';


const RightAddSensorPopup = (props) => {
  
 
 

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
    props.getSensors();
  };

console.log("sensor frequency", sensorData.sensor_frequency)

  return (
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
  );
};

export default RightAddSensorPopup