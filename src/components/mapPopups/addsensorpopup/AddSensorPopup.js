import React, { useState, useEffect } from 'react';
import "../../../assets/css/ContributesPopup.css"
import axios from 'axios';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const RightAddSensorPopup = (props) => {


  const arrivedCoordinates = props.mapClickedCoordinates


  const [sensorData, setSensorData] = useState({
    sensor_Indication:'good',
    sensor_description:'',
    sensor_title:'',
    sensor_type:'unknown',
  });

  useEffect(() => {
    setSensorData(prevSensorData => ({
      ...prevSensorData,
      sensor_coordinates: arrivedCoordinates,
      pipe: localStorage.getItem('selectedPipeId')
    }));
  }, [arrivedCoordinates]);

  // useEffect(() => {
  //   setSensorData({...sensorData,  pipe: localStorage.getItem('selectedPipeId')});
  // }, [sensorData]);



const openSensor = props.openSensor;

  const handleSensorDataChange = (e) => {
    setSensorData({
      ...sensorData,
      [e.target.name]: e.target.value,
      
    });
  };


const { sensor_coordinates, sensor_description, sensor_Indication, sensor_type, sensor_creation_date, sensor_frequency, sensor_title, pipe } = sensorData;
  const handleSubmitData = () => {



    if (!sensorData.sensor_title || !sensorData.sensor_description || !sensorData.sensor_coordinates || !sensorData.pipe) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      sensor_coordinates, sensor_description, sensor_Indication, sensor_type, sensor_creation_date, sensor_frequency, sensor_title, pipe
    };



    axios
      .post(`${process.env.REACT_APP_API_URL}/api/sensors/`, data,
      
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



  const reloadPage = () => {
  
    localStorage.removeItem("selectedPipeId");
    props.handleCloseSensor();
    // window.location.reload();
    };

console.log("sensor frequency", sensorData.sensor_frequency)

  return (
<>
    <Modal
    disableEnforceFocus
    hideBackdrop
    style={{ position: 'initial' }}
    
      open={openSensor}
     
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box >
      
        <div>
      
        <div className="contributesPopup">
          <h3>Add Sensor</h3>
      <form>
      <label>Select Pipe:</label>
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
      <div className='formButtonsContainer'>
      <button onClick={handleSubmitData}>Submit</button>
      <button onClick={reloadPage}>Cancel</button>

      </div>
   
    </div>
        </div>
      </Box>
    </Modal>

   
    </>
    );
};

export default RightAddSensorPopup