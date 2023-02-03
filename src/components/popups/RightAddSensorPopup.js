import React, { useState } from 'react';
import "./RightAddSensorPopup.css"



const RightAddSensorPopup = (props) => {
  const [sensorData, setSensorData] = useState({
    sensor_coordinates: [1.0, 2.0],
    sensor_creationdate: "2023-01-21T17:08:39Z",
    sensor_type: "Sensor type:",
    sensor_title: "Sensor title:",
    sensor_description: "Sensor description:",
    sensor_frequency: [
      [1.0, 2.0, 1, 3],
      [2.0, 1, 3, 5]
    ],
    sensor_Indication: "unknown",
    map: 1
  });

  const handleChange = (e) => {
    setSensorData({
      ...sensorData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="popup">
      <form>
        <label>Sensor coordinates:</label>
        <input
          type="text"
          name="reading_coordinates"
          value={sensorData.sensor_coordinates}
          onChange={handleChange}
        />
        <label>Sensor creation date:</label>
        <input
          type="text"
          name="sensor_creationdate"
          value={sensorData.sensor_creationdate}
          onChange={handleChange}
        />
        <label>Sensor type:</label>
        <input
          type="text"
          name="sensor_type"
          value={sensorData.sensor_type}
          onChange={handleChange}
        />
        <label>Sensor title:</label>
        <input
          type="text"
          name="sensor_title"
          value={sensorData.sensor_title}
          onChange={handleChange}
        />
        <label>Sensor description:</label>
        <input
          type="text"
          name="sensor_description"
          value={sensorData.sensor_description}
          onChange={handleChange}
        />
        <label>Sensor frequency:</label>
        <input
          type="text"
          name="sensor_frequency"
          value={sensorData.sensor_frequency}
          onChange={handleChange}
        />
        <label>Sensor Indication:</label>
        <input
          type="text"
          name="sensor_Indication"
          value={sensorData.sensor_Indication}
          onChange={handleChange}
        />
        <label>Map:</label>
        <input
          type="text"
          name="map"
          value={sensorData.map}
          onChange={handleChange}
        />
      </form>
      <button onClick={props.onClose}>Close Popup</button>
    </div>
  );
};

export default RightAddSensorPopup