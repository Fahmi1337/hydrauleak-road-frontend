import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import sensorBlueIcon from '../assets/icons/sensorBlue.png';

import SensorViewPopup from '../components/mapPopups/addsensorpopup/SensorViewPopup';
import SensorUpdatePopup from '../components/mapPopups/addsensorpopup/SensorUpdatePopup';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const Map = () => {
  const [map, setMap] = useState(null);
  const [sensorsData, setSensorsData] = useState([]);
  const [showSensors, setShowSensors] = useState(true);



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

  // Initialize the map on component mount
  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.21088520218619, 46.806343083853875],
        zoom: 15
      });

      setMap(newMap);
    }
  }, [map]);







  // Add sensor icons to the map on component mount and whenever the sensorsData state updates
  useEffect(() => {
    if (map) {
      sensorsData.forEach((sensor) => {




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
  // const marker = new mapboxgl.Marker()
  //   .setLngLat(sensor.sensor_coordinates)
  //   .setPopup(popup)
  //   .addTo(map);
    const marker = new mapboxgl.Marker({
      
      element: new Image(32, 32),
      anchor: 'bottom',
      offset: [0, -16], // half the icon height
      
    })
      .setPopup(popup)
      .setLngLat(sensor.sensor_coordinates)
      .addTo(map);
    
    // Load the custom icon image
    marker.getElement().src = sensorBlueIcon;

 
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
  
  const ViewButton = marker._popup._content.querySelector('#viewSensor');
  ViewButton.addEventListener('click', () => {
    setSelectedSensor(sensor);
    setOpenViewSensorPopup(true);
  });







        const layerId = `sensor-${sensor.id}`;
        const sourceId = `sensor-source-${sensor.id}`;
        const iconId = `sensor-blue-${sensor.id}`;
      

        console.log("sensor id :", iconId)
        map.loadImage(sensorBlueIcon, (error, image) => {
          if (error) throw error;
          map.addImage(iconId, image);
      
          // Add a new source with the sensor data
          map.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: sensor.sensor_coordinates
              },
              properties: {
                title: sensor.sensor_title,
                description: sensor.sensor_description
              }
            }
          });
      

          map.setPopup(popup)
          // Add a new layer for the sensors
          map.addLayer({
            id: layerId,
            type: 'symbol',
            source: sourceId,
            layout: {
              'icon-image': iconId,
              'icon-size': 0.5,
              visibility: showSensors ? 'visible' : 'none'
            }
          });
        });
      });
      
    }
  }, [map, sensorsData, showSensors]);

  // Toggle sensor icons visibility when the checkbox is clicked
  const handleCheckboxChange = (event) => {
    setShowSensors(event.target.checked);
    sensorsData.forEach((sensor) => {

      if (map) {
          if (event.target.checked) {
            map.setLayoutProperty('sensor-'+sensor.id, 'visibility', 'visible');
          } else {
            map.setLayoutProperty('sensor-'+sensor.id, 'visibility', 'none');
          }
        }
  })
 
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
{/* sensor Popups */}
      <div>
        <label>
          <input type="checkbox" checked={showSensors} onChange={handleCheckboxChange} />
          Show sensors
        </label>
      </div>
      <div id="map-container" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default Map;
