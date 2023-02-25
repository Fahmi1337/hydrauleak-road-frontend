import React, { useState, useEffect } from 'react';
import "./addSensorPopup.css"
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const RightAddSensorPopup = ({onOpen,onCancel,sensor}) => {

  const [sensorData, setSensorData] = useState(sensor);
  
  const handleSensorDataChange = (e) => {
    setSensorData({
      ...sensorData,
      [e.target.name]: e.target.value,
      
    });
  };

const { sensor_coordinates, sensor_description, sensor_Indication, sensor_type, sensor_creation_date, sensor_frequency, sensor_title, pipe } = sensorData;
  const handleSubmitData = () => {



    if (!sensorData.sensor_title || !sensorData.sensor_description || !sensorData.sensor_coordinates ) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      sensor_coordinates, sensor_description, sensor_Indication, sensor_type, sensor_creation_date, sensor_frequency, sensor_title, pipe
    };



    axios
      .put(`${process.env.REACT_APP_API_URL}/api/sensors/${sensorData.id}/`, data,
      
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
  
   
    onCancel();
  };




console.log("sensor frequency", sensorData.sensor_frequency)

  return (
<>
    <Modal
    disableEnforceFocus
    hideBackdrop
    style={{ position: 'initial' }}
    
      open={onOpen}
     
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box >
      
        <div>
      
        <div className="SensorPopup">
          <h3>Update Sensor</h3>
      <form>
      <label>Pipe:</label>
        <input
        disabled
          type="text"
          name="pipe"
          value={localStorage.getItem('selectedPipeId') ||  sensorData.pipe}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor coordinates:</label>
        
        <input
        disabled
          type="text"
          name="sensor_coordinates"
          value={sensorData.sensor_coordinates}
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
            <textarea    type="text"
          name="sensor_description" value={sensorData.sensor_description} onChange={e => handleSensorDataChange(e)} />
        
        <label>Sensor creation date:</label>
        <input
          type="datetime-local"
          name="sensor_creation_date"
          value={sensorData.sensor_creation_date}
          onChange={e => handleSensorDataChange(e)}
        />
        <label>Sensor type:</label>
        <input
          type="text"
          name="sensor_type"
          value={sensorData.sensor_type}
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
              <select type="text" name="sensor_Indication" value={sensorData.sensor_Indication} onChange={e => handleSensorDataChange(e)}>
              <option value="unknown">Unknown</option>
              <option value="good">Good</option>
              <option value="notable">Notable</option>  
              <option value="critical">Critical</option>
              
              </select>



      </form>
      <button onClick={handleSubmitData}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
        </div>
      </Box>
    </Modal>

   
    </>
    );
};

export default RightAddSensorPopup