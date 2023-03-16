import React, { useState, useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios';

import SensorViewPopup from '../components/mapPopups/addsensorpopup/SensorViewPopup';
import SensorUpdatePopup from '../components/mapPopups/addsensorpopup/SensorUpdatePopup';
import sensorBlueIcon from '../assets/icons/sensorBlue.png';

import ButtonWithPopup from "../components/mapPopups/contributes/AddButtonPopup"


mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const MapWithSensors = () => {
  const [sensorsData, setSensorsData] = useState([]);
  const [showSensors, setShowSensors] = useState(true);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const sensors = useRef([]);

  const [submitActive, setSubmitActive] = useState(false);
  const [mapClickedCoordinates, setMapClickedCoordinates] = useState([]);
  
  //sensor const select delete update 
  const [selectedSensor, setSelectedSensor] = useState();
  const [openViewSensorPopup, setOpenViewSensorPopup] = useState(false);
  const [openUpdateSensorPopup, setOpenUpdateSensorPopup] = useState(false);



  // Fetch the sensor data from the API
  const getSensors = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        setSensorsData(res.data.data.map(sensor => sensor));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSensors();
  }, [getSensors]);


  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-71.21088520218619, 46.806343083853875],
        zoom: 12,
      });
    }
    
    const clickHandler = (e) => {
      if (submitActive) {
        const lngLat = [e.lngLat.lng, e.lngLat.lat];
        setMapClickedCoordinates(lngLat);
        const newMarker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);
      }
    };
    
    if (submitActive) {
      map.current.on("click", clickHandler);
    } else {
      map.current.off("click", clickHandler);
    }
    
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (map.current) {
        map.current.off("click", clickHandler);
      }
    };
  }, [submitActive, mapClickedCoordinates]);

  console.log("coordinatess map clicked", mapClickedCoordinates )

  console.log("submitActive 2", submitActive )





  
  useEffect(() => {
    if (map.current) {
      sensors.current.forEach(sensor => {
        if (showSensors) {
          sensor.addTo(map.current);
        } else {
          sensor.remove();
        }
      });
    }
  }, [showSensors]);

    useEffect(() => {
    if (map.current && sensors.current.length === 0) {
      sensorsData.forEach(sensor => {

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <h3>ID: ${sensor.id}</h3>  
        <h3>Sensor title: ${sensor.sensor_title}</h3>
      
        <p>Sensor description: ${sensor.sensor_description}</p>
        <p>Sensor type: ${sensor.sensor_type}</p>
        <p>Sensor diameter range: ${sensor.sensor_diameter_range}</p>             
        <p>Sensor indication: ${sensor.sensor_Indication}</p>
    
        <button id="deleteSensor" data-sensor-id="${sensor.id}">Delete</button>
        <button id="updateSensor" data-sensor-id="${sensor.id}">Update</button>
        <button id="viewSensor" data-sensor-id="${sensor.id}">View</button>
        `);
        const marker = new mapboxgl.Marker({
            element: document.createElement('img'),
            anchor: 'bottom',
            offset: [0, -16], // half the icon height
          })
          .setPopup(popup)
          .setLngLat(sensor.sensor_coordinates)
          .addTo(map.current);
         // Adjust the size of the image
         marker.getElement().setAttribute('src', sensorBlueIcon);
          sensors.current.push(marker);

          // Delete Sensor
        const deleteButton = marker._popup._content.querySelector('#deleteSensor');
        deleteButton.addEventListener('click', () => {
          const sensorId = deleteButton.getAttribute('data-sensor-id');
          // Send DELETE request to API endpoint using Sensor id

          const confirmation = window.confirm('Are you sure you want to delete this sensor?');

          if (!confirmation) {
            return;
          }

          axios.delete(`${process.env.REACT_APP_API_URL}/api/sensors/${sensorId}/`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(response => {
            // console.log('Sensor deleted', response.data);
            // Remove the Sensor from the map
            marker.remove();
          })
          .catch(error => {
            console.error('Error deleting Sensor', error);
          });
        });

        // Update Sensor
        const updateButton = marker._popup._content.querySelector('#updateSensor');
        updateButton.addEventListener('click', () => {
          // code to open update popup
          setSelectedSensor(sensor);
          setOpenUpdateSensorPopup(true);
          // console.log('Update button clicked');
        });

        // View Sensor
        const viewButton = marker._popup._content.querySelector('#viewSensor');
        viewButton.addEventListener('click', () => {
          setSelectedSensor(sensor);
          setOpenViewSensorPopup(true);
        });
      });
    }
  }, [sensorsData]);

const HandleSetSubmitActive = ()=>{
  setSubmitActive(true);
}
const HandleSetSubmitDeactivate = ()=>{
  setSubmitActive(false);
}
  
  return (
    <div>

           {/* sensor Popups */}
<div>
  <div id="popup-container"></div>
  {openViewSensorPopup && selectedSensor && (
    <SensorViewPopup
      sensor={selectedSensor}
      onOpen={openViewSensorPopup}
      onCancel={() => setOpenViewSensorPopup(false)}
    />
  )}
</div>
<div>
  <div id="popup-container"></div>
  {openUpdateSensorPopup && selectedSensor && (
    <SensorUpdatePopup
      sensor={selectedSensor}
      onOpen={openUpdateSensorPopup}
      onCancel={() => setOpenUpdateSensorPopup(false)}
    />
  )}
</div>
<button onClick={() => setSubmitActive(!submitActive)}>Activate Submit Mark</button>

<ButtonWithPopup setSubmitActive={setSubmitActive} HandleSetSubmitDeactivate={HandleSetSubmitDeactivate} HandleSetSubmitActive={HandleSetSubmitActive} mapClickedCoordinates={mapClickedCoordinates} />
{/* sensor Popups */}
      <label>
        <input
          type="checkbox"
          checked={showSensors}
          onChange={() => setShowSensors(!showSensors)}
        />
        Show Sensors
      </label>
      <div
        ref={mapContainer}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default MapWithSensors;
