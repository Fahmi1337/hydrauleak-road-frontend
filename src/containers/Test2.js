import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import sensorIcon from '../assets/icons/sensorBlue.png';

const Test3 = () => {
  const [map, setMap] = useState({});
  const [sensorsData, setSensorsData] = useState([]);
  const [showSensors, setShowSensors] = useState(true);
  const [blueMarkerVisible, setBlueMarkerVisible] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState();
const [openViewSensorPopup, setOpenViewSensorPopup] = useState(false);
const [openUpdateSensorPopup, setOpenUpdateSensorPopup] = useState(false);
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.21088520218619, 46.806343083853875],
      zoom: 10
    });

    mapInstance.on('load', () => {  
      if (mapInstance) {
        sensorsData.forEach((sensor) => {
          const layerId = 'sensor-' + sensor.id;
          //   const sourceId = 'sensors-data';
      
          // Add a new source with the sensor data
          mapInstance.addSource(layerId, {
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
      
          // Add a new layer for the sensors
          mapInstance.addLayer({
            id: 'sensor-'+sensor.id,
            type: 'symbol',
            source: layerId,
            layout: {
              'icon-image': 'sensor-icon',
              'icon-size': 0.5
            },
            paint: {
              'circle-color': '#F44336',
              'circle-radius': 10
            },
            filter: ['==', '$type', 'Point'],
            layout: {
              visibility: showSensors ? 'visible' : 'none'
            }
          });
          
          // Set up event listener for clicking on a sensor
          mapInstance.on('click', 'sensor-' + sensor.id, (e) => {
            console.log(e)
          const popupContent = document.createElement('div');
          popupContent.innerHTML = `<h3>Sensor title: ${sensor.sensor_title}</h3> 
          <h3>ID : ${sensor.id}</h3> 
          <p>Sensor description: ${sensor.sensor_description}</p> 
          <p>Sensor type: ${sensor.sensor_type}</p> 
          
          <p>sensor status: ${sensor.sensor_status}</p> 
          <p>sensor length: ${sensor.sensor_length}</p> 
          <button id="deletesensor" data-sensor-id="${sensor.id}">Delete</button> 
          <button id="updatesensor" data-sensor-id="${sensor.id}">Update</button> 
          <button id="viewsensor" data-sensor-id="${sensor.id}">View Details</button>` ;
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(popupContent)
          .addTo(map);
          localStorage.setItem("selectedSensorId",sensor.id);
        
          //delete sensor
          const deleteButton = document.getElementById('deleteSensor');
          deleteButton.addEventListener('click', () => {
            const sensorId = deleteButton.getAttribute('data-sensor-id');
            // Send DELETE request to API endpoint using sensor id
            const confirmation = window.confirm('Are you sure you want to delete this sensor?');
        
          if (!confirmation) {
            return;
          }
            axios.delete(`${process.env.REACT_APP_API_URL}/api/sensors/${sensorId}/`, {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
              }
            })
            .then(response => {
              // console.log('sensor deleted', response.data);
              // Remove the sensor from the map
              map.removeLayer('sensor-' + sensor.id);
              map.removeSource('sensor-' + sensor.id);
            })
            .catch(error => {
              console.error('Error deleting sensor', error);
            });
          });
          
          // Set up event listener for update button
          const updateButton = document.getElementById('updateSensor');
          updateButton.addEventListener('click', () => {
            // code to open update popup
            setSelectedSensor(sensor);
            setOpenUpdateSensorPopup(true);
            // console.log('Update button clicked');
          });
          
          // Set up event listener for view button
          const viewButton = document.getElementById('viewSensor');
          viewButton.addEventListener('click', () => {     
            setSelectedSensor(sensor);
            setOpenViewSensorPopup(true);
          });      
        });
          // Add a new layer for the sensors
          mapInstance.addLayer({
            id: 'sensor-'+sensor.id,
            type: 'symbol',
            source: 'sensor-'+sensor.id,
            layout: {
              'icon-image': sensorIcon,
              'icon-size': 0.5,
         
            }
          });
          mapInstance.loadImage('http://placekitten.com/50/50', function(error, image) {

    if (error) throw error;
    // Add the loaded image to the style's sprite with the ID 'kitten'.
    map.addImage('kitten', image);

});
        });
        
        // Fit the map to the sensor data bounds
        const bounds = new mapboxgl.LngLatBounds();
        sensorsData.forEach(sensor => {
          bounds.extend(sensor?.sensor_coordinates);
        });
        mapInstance.fitBounds(bounds, { padding: 50 });


      


      }
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [sensorsData, showSensors]);





  // Fetch the sensor data from the API
  const getSensors = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem('token')
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

  const handleToggleSensors = useCallback(() => {
    setShowSensors(!showSensors);
  }, [showSensors]);




console.log("hey?", sensorsData[1]?.id)


  function handleBlueMarkerCheckboxChange(event) {
    setBlueMarkerVisible(event.target.checked);
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
      <div id="map-container" style={{ height: '400px' }} />
            <label>
         <input
           type="checkbox"
           checked={blueMarkerVisible}
           onChange={handleBlueMarkerCheckboxChange}
        />
        Show red marker
       </label>
     </div>
   );
 }

 export default Test3;
