import React, { useState, useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios';


import ButtonWithPopup from "../components/mapPopups/contributes/AddButtonPopup"
import MapLayersPopup from "../components/mapPopups/mapLayersPopup/MapLayersPopup"

import sensorGreenIcon from '../assets/icons/sensorGreen.png';
import sensorBlueIcon from '../assets/icons/sensorBlue.png';
import markIcon from '../assets/icons/Mark.png';
import mapIcon from '../assets/icons/Map.png';
import pipeAccessIcon from '../assets/icons/PipeAccess.png';


import SensorViewPopup from '../components/mapPopups/addsensorpopup/SensorViewPopup';
import SensorUpdatePopup from '../components/mapPopups/addsensorpopup/SensorUpdatePopup';

import MarkViewPopup from '../components/mapPopups/addmarkpopup/MarkViewPopup';
import MarkUpdatePopup from '../components/mapPopups/addmarkpopup/MarkUpdatePopup';

import PipeAccessViewPopup from '../components/mapPopups/addpipeaccesspopup/PipeAccessViewPopup';
import PipeAccessUpdatePopup from '../components/mapPopups/addpipeaccesspopup/PipeAccessUpdatePopup';

import PipeViewPopup from '../components/mapPopups/addpipepopup/PipeViewPopup';
import PipeUpdatePopup from '../components/mapPopups/addpipepopup/PipeUpdatePopup';

import ZoneViewPopup from '../components/mapPopups/addzonepopup/ZoneViewPopup';
import ZoneUpdatePopup from '../components/mapPopups/addzonepopup/ZoneUpdatePopup';

import MapViewPopup from '../components/mapPopups/addmappopup/MapViewPopup';
import MapUpdatePopup from '../components/mapPopups/addmappopup/MapUpdatePopup';

import { useGetMaps, useGetPipes,useGetPipeAccess, useGetMarkers, useGetZones, useGetSensors } from "../actions/ApiFunctions";

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const MapWithSensors = () => {
  // const [sensorsData, setSensorsData] = useState([]);
  const [showSensors, setShowSensors] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showPipeAccess, setShowPipeAccess] = useState(true);
  const [showMaps, setShowMaps] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showPipes, setShowPipes] = useState(true);
  const mapContainer = useRef(null);
  const map = useRef(null);
  

  const [submitActive, setSubmitActive] = useState(false);
  const [mapClickedCoordinates, setMapClickedCoordinates] = useState([]);
  
 

// map const select delete update
const [selectedMap, setSelectedMap] = useState();
const [openViewMapPopup, setOpenViewMapPopup] = useState(false);
const [openUpdateMapPopup, setOpenUpdateMapPopup] = useState(false);

//sensor const select delete update 
const [selectedSensor, setSelectedSensor] = useState();
const [openViewSensorPopup, setOpenViewSensorPopup] = useState(false);
const [openUpdateSensorPopup, setOpenUpdateSensorPopup] = useState(false);

// mark const select delete update
const [selectedMark, setSelectedMark] = useState();
const [openViewMarkPopup, setOpenViewMarkPopup] = useState(false);
const [openUpdateMarkPopup, setOpenUpdateMarkPopup] = useState(false);

// pipe const select delete update
const [selectedPipe, setSelectedPipe] = useState();
const [openViewPipePopup, setOpenViewPipePopup] = useState(false);
const [openUpdatePipePopup, setOpenUpdatePipePopup] = useState(false);

// pipeaccess const select delete update
const [selectedPipeaccess, setSelectedPipeaccess] = useState();
const [openViewPipeaccessPopup, setOpenViewPipeaccessPopup] = useState(false);
const [openUpdatePipeaccessPopup, setOpenUpdatePipeaccessPopup] = useState(false);

// zone const select delete update
const [selectedZone, setSelectedZone] = useState();
const [openViewZonePopup, setOpenViewZonePopup] = useState(false);
const [openUpdateZonePopup, setOpenUpdateZonePopup] = useState(false);


  const sensors = useRef([]);
  const markers = useRef([]);
  const pipesAccess = useRef([]);
  const mapsRef = useRef([]);
  const pipes = useRef([]);
  const zones = useRef([]);

  const sensorsData = useGetSensors();
  const markersData = useGetMarkers();
  const pipesAccessData = useGetPipeAccess();
  const mapsData = useGetMaps();
  


  const pipesData = useGetPipes();
  
  
  const zonesData = useGetZones();



  const [searchCoordinates, setSearchCoordinates] = useState([-71.3583, 50.1686]);


  const [zoneCoordinates, setZoneCoordinates] = useState([]);

  const HandleSetSubmitActive = ()=>{
    setSubmitActive(true);
  }
  const HandleSetSubmitDeactivate = ()=>{
    setSubmitActive(false);
  }
    






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
        // const newMarker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);
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






  //SENSOR HANDLING START
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
         marker.getElement().setAttribute('src', sensorGreenIcon);
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
  //SENSOR HANDLING END



  //MARK HANDLING START
  useEffect(() => {
    if (map.current) {
      markers.current.forEach(marker => {
        if (showMarkers) {
          marker.addTo(map.current);
        } else {
          marker.remove();
        }
      });
    }
  }, [showMarkers]);

    useEffect(() => {
    if (map.current && markers.current.length === 0) {
      markersData.forEach(mark => {

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>mark title: ${mark.mark_title}</h3>
          <h3>ID: ${mark.id}</h3>
          <p>mark description: ${mark.mark_description}</p>
          <p>Pipe: ${mark.pipe}</p>
          <button id="deleteMark" data-mark-id="${mark.id}">Delete</button>
          <button id="updateMark" data-mark-id="${mark.id}">Update</button>
          <button id="viewMark" data-mark-id="${mark.id}">View Details</button>
        `);
        const marker = new mapboxgl.Marker({
            element: document.createElement('img'),
            anchor: 'bottom',
            offset: [0, -16], // half the icon height
          })
          .setPopup(popup)
          .setLngLat(mark.mark_coordinates)
          .addTo(map.current);
         // Adjust the size of the image
         marker.getElement().setAttribute('src', markIcon);
          markers.current.push(marker);

         // Delete Mark
            const deleteButton = marker._popup._content.querySelector('#deleteMark');
            deleteButton.addEventListener('click', () => {
              const markId = deleteButton.getAttribute('data-mark-id');
              // Send DELETE request to API endpoint using Mark id

              const confirmation = window.confirm('Are you sure you want to delete this mark?');

            if (!confirmation) {
              return;
            }
              axios.delete(`${process.env.REACT_APP_API_URL}/api/marks/${markId}/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then(response => {
                // console.log('Mark deleted', response.data);
                // Remove the Mark from the map
                marker.remove();
              })
              .catch(error => {
                console.error('Error deleting Mark', error);
              });
            });

            // Update Mark
            const updateButton = marker._popup._content.querySelector('#updateMark');
            updateButton.addEventListener('click', () => {
              // code to open update popup
              setSelectedMark(mark);
              setOpenUpdateMarkPopup(true);
              // console.log('Update button clicked');
            });

            // View Mark
            const viewButton = marker._popup._content.querySelector('#viewMark');
            viewButton.addEventListener('click', () => {
              setSelectedMark(mark);
              setOpenViewMarkPopup(true);
            });
          });
    }
  }, [markersData]);
  //MARK HANDLING END




  //PIPEACCESS HANDLING START
  useEffect(() => {
    if (map.current) {
      pipesAccess.current.forEach(pipeAccess => {
        if (showPipeAccess) {
          pipeAccess.addTo(map.current);
        } else {
          pipeAccess.remove();
        }
      });
    }
  }, [showPipeAccess]);

    useEffect(() => {
    if (map.current && pipesAccess.current.length === 0) {
      pipesAccessData.forEach(pipeaccess => {

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>ID: ${pipeaccess.id}</h3>
          <h3>Pipe access title: ${pipeaccess.pipe_access_title}</h3>
          <p>Pipe access description: ${pipeaccess.pipe_access_description}</p>
          <p>Pipe access type: ${pipeaccess.pipe_access_type}</p>
          <p>Pipe: ${pipeaccess.pipe}</p>             
          <button id="deletePipeaccess" data-pipeaccess-id="${pipeaccess.id}">Delete</button>
          <button id="updatePipeaccess" data-pipeaccess-id="${pipeaccess.id}">Update</button>
          <button id="viewPipeaccess" data-pipeaccess-id="${pipeaccess.id}">View</button>
        `);
        const marker = new mapboxgl.Marker({
            element: document.createElement('img'),
            anchor: 'bottom',
            offset: [0, -16], // half the icon height
          })
          .setPopup(popup)
          .setLngLat(pipeaccess.pipe_access_coordinates)
          .addTo(map.current);
         // Adjust the size of the image
         marker.getElement().setAttribute('src', pipeAccessIcon);
         pipesAccess.current.push(marker);

         
          // Delete Pipe access
          const deleteButton = marker._popup._content.querySelector('#deletePipeaccess');
          deleteButton.addEventListener('click', () => {
          const pipeaccessId = deleteButton.getAttribute('data-pipeaccess-id');
          // Send DELETE request to API endpoint using Pipe access id
          const confirmation = window.confirm('Are you sure you want to delete this pipe access?');

            if (!confirmation) {
              return;
            }
          axios.delete(`${process.env.REACT_APP_API_URL}/api/pipeacces/${pipeaccessId}/`, {
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
          })
          .then(response => {
          // console.log('Pipe access deleted', response.data);
          // Remove the Pipe access from the map
          marker.remove();
          })
          .catch(error => {
          console.error('Error deleting Pipe access', error);
          });
          });

          // Update Pipe access
          const updateButton = marker._popup._content.querySelector('#updatePipeaccess');
          updateButton.addEventListener('click', () => {
          // code to open update popup
          setSelectedPipeaccess(pipeaccess);
          setOpenUpdatePipeaccessPopup(true);
          // console.log('Update button clicked');
          });

          // View Pipe access
          const viewButton = marker._popup._content.querySelector('#viewPipeaccess');
          viewButton.addEventListener('click', () => {
          setSelectedPipeaccess(pipeaccess);
          setOpenViewPipeaccessPopup(true);
          });
          });

    }
  }, [pipesAccessData]);
  //PIPEACCESS HANDLING END



  //MAP HANDLING START
  useEffect(() => {
    if (map.current) {
      mapsRef.current.forEach(theMap => {
        if (showMaps) {
          theMap.addTo(map.current);
        } else {
          theMap.remove();
        }
      });
    }
  }, [showMaps]);

    useEffect(() => {
    if (map.current && mapsRef.current.length === 0) {
      mapsData.forEach(mapData => {

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>ID: ${mapData.id}</h3>  
          <h3>Map title: ${mapData.map_title}</h3>
        
          <p>Map description: ${mapData.map_description}</p>

          <button id="deleteMap" data-map-id="${mapData.id}">Delete</button>
          <button id="updateMap" data-map-id="${mapData.id}">Update</button>
          <button id="viewMap" data-map-id="${mapData.id}">View</button>
        `);
        const marker = new mapboxgl.Marker({
            element: document.createElement('img'),
            anchor: 'bottom',
            offset: [0, -16], // half the icon height
          })
          .setPopup(popup)
          .setLngLat(mapData.map_coordinate)
          .addTo(map.current);
         // Adjust the size of the image
         marker.getElement().setAttribute('src', mapIcon);
         mapsRef.current.push(marker);

         
          // Delete Map
              const deleteButton = marker._popup._content.querySelector('#deleteMap');
              deleteButton.addEventListener('click', () => {
                const mapId = deleteButton.getAttribute('data-map-id');
                // Send DELETE request to API endpoint using Map id
                const confirmation = window.confirm('Are you sure you want to delete this map?');

              if (!confirmation) {
                return;
              }
                axios.delete(`${process.env.REACT_APP_API_URL}/api/maps/${mapId}/`, {
                  headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                  }
                })
                .then(response => {
                  // console.log('Map deleted', response.data);
                  // Remove the Map from the map
                  marker.remove();
                })
                .catch(error => {
                  console.error('Error deleting Map', error);
                });
              });
              // Update Map
              const updateButton = marker._popup._content.querySelector('#updateMap');
              updateButton.addEventListener('click', () => {
                // code to open update popup
                setSelectedMap(mapsRef);
                setOpenUpdateMapPopup(true);
                // console.log('Update button clicked');
              });
              // View Map
              
              const ViewButton = marker._popup._content.querySelector('#viewMap');
              ViewButton.addEventListener('click', () => {
                setSelectedMap(mapsRef);
                setOpenViewMapPopup(true);
              });
            });


    }
  }, [mapsData]);
  //MAP HANDLING END




  

  // // //PIPE HANDLING START
  useEffect(() => {
    if (map.current) {
   
        pipes.current.forEach(pipe => {
          if (showPipes) {
          
              map.current.setLayoutProperty('pipe-'+pipe.id , 'visibility', 'visible');
            
          
          } else {
          
              map.current.setLayoutProperty('pipe-'+pipe.id , 'visibility', 'none');
          
          }
        });
    

    }
  }, [showPipes, map]);


useEffect(() => {
  setShowPipes(showPipes);
}, [showPipes]);

useEffect(() => {
  
  if (map.current && pipes.current.length === 0) {
   
    map.current.on('load', () => {
      // Add pipes to the map
      pipesData.forEach((pipe) => {
        console.log("???", 'pipe-' + pipe.id)
        const coordinates = pipe.pipe_coordinates;
        // create a GeoJSON feature with the pipe coordinates
        const pipeFeature = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
          properties: {},
        };
        // add the pipe feature to the map
        map.current.addSource('pipe-' + pipe.id, {
          type: 'geojson',
          data: pipeFeature,
        });
        map.current.addLayer({
          id: 'pipe-' + pipe.id,
          type: 'line',
          source: 'pipe-' + pipe.id,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': showPipes ? 'visible' : 'none',
          },
          paint: {
            'line-color': '#3284ff',
            'line-width': 5,
          },
        });
        console.log("showPipes?", showPipes ? 'visible' : 'none',)
        // map.current.setLayoutProperty('pipe-' + pipe.id,'visibility',showPipes ? 'visible' : 'none');
        map.current.on('click', 'pipe-' + pipe.id, (e) => {
          const popupContent = document.createElement('div');
          popupContent.innerHTML = `<h3>Pipe title: ${pipe.pipe_title}</h3> 
          <h3>ID : ${pipe.id}</h3> 
          <p>Pipe description: ${pipe.pipe_description}</p> 
          <p>Pipe type: ${pipe.pipe_type}</p> 
          <p>Pipe status: ${pipe.pipe_status}</p> 
          <p>Pipe length: ${pipe.pipe_length}</p> 
          <button id="deletePipe-${pipe.id}">Delete</button> 
          <button id="updatePipe-${pipe.id}">Update</button> 
          <button id="viewPipe-${pipe.id}">View Details</button>`;
          const popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setDOMContent(popupContent)
            .addTo(map.current);
          localStorage.setItem("selectedPipeId", pipe.id);
          // Set up event listener for delete button
          const deleteButton = document.getElementById('deletePipe-' + pipe.id);
          deleteButton.addEventListener('click', () => {
            const confirmation = window.confirm('Are you sure you want to delete this pipe?');
            if (!confirmation) {
              return;
            }
            // Send DELETE request to API endpoint using Pipe id
            axios.delete(`${process.env.REACT_APP_API_URL}/api/pipes/${pipe.id}/`, {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
              }
            })
            .then(response => {
              // console.log('Pipe deleted', response.data);
              // Remove the Pipe from the map
              map.current.removeLayer('pipe-' + pipe.id);
              map.current.removeSource('pipe-' + pipe.id);
              popup.remove(); // close the popup after deleting the pipe
            })
            .catch(error => {
              console.error('Error deleting Pipe', error);
            });
          });
          // Set up event listener for update button
          const updateButton = document.getElementById('updatePipe-' + pipe.id);
          updateButton.addEventListener('click', () => {
            // code to open update popup
            setSelectedPipe(pipe);
            setOpenUpdatePipePopup(true);
            popup.remove(); // close the popup after opening the update popup
        // console.log('Update button clicked');
      });
      
      // Set up event listener for view button
      const viewButton = document.getElementById('viewPipe');
      viewButton.addEventListener('click', () => {     
        setSelectedPipe(pipe);
        setOpenViewPipePopup(true);
        popup.remove();
      });      
      })

            
    });
    
    });
    
        }
        
      }, [pipesData, showPipes]);
      //PIPE HANDLING END





  return (
    <div>
  <div
        className="mapContainer" 
        ref={mapContainer}
        style={{ width: '145em', height: '80.5em',left: '13.8em' }}
      />


        <ButtonWithPopup 
          setSubmitActive={setSubmitActive} 
          HandleSetSubmitDeactivate={HandleSetSubmitDeactivate} 
          HandleSetSubmitActive={HandleSetSubmitActive} 
          mapClickedCoordinates={mapClickedCoordinates} />

        <MapLayersPopup 
        showSensors={showSensors} setShowSensors={setShowSensors}
        showMarkers={showMarkers} setShowMarkers={setShowMarkers}
        showPipeAccess={showPipeAccess} setShowPipeAccess={setShowPipeAccess}
        showMaps={showMaps} setShowMaps={setShowMaps}
        showZones={showZones} setShowZones={setShowZones}
        showPipes={showPipes} setShowPipes={setShowPipes}
        />

      {/* sensor Popups start*/}

         
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
  {/* sensor Popups end*/}

{/* map Popups */}

    <div>
      <div id="popup-container"></div>
      {openViewMapPopup && selectedMap && (
        <MapViewPopup
          map={selectedMap}
          onOpen={openViewMapPopup}
          onCancel={() => setOpenViewMapPopup(false)}
        />
      )}
    </div>
    <div>
      <div id="popup-container"></div>
      {openUpdateMapPopup && selectedMap && (
        <MapUpdatePopup
          map={selectedMap}
          onOpen={openUpdateMapPopup}
          onCancel={() => setOpenUpdateMapPopup(false)}
        />
      )}
    </div>
    {/* map Popups */}

      {/* mark Popups */}
      <div>
        <div id="popup-container"></div>
        {openViewMarkPopup && selectedMark && (
          <MarkViewPopup
          mark={selectedMark}
            onOpen={openViewMarkPopup}
            onCancel={() => setOpenViewMarkPopup(false)}
          />
        )}
      </div>
      <div>
        <div id="popup-container"></div>
        {openUpdateMarkPopup && selectedMark && (
          <MarkUpdatePopup
          mark={selectedMark}
            onOpen={openUpdateMarkPopup}
            onCancel={() => setOpenUpdateMarkPopup(false)}
          />
        )}
      </div>
      {/* mark Popups */}


      {/* pipe Popups */}
      <div>
        <div id="popup-container"></div>
        {openViewPipePopup && selectedPipe && (
          <PipeViewPopup
          pipe={selectedPipe}
            onOpen={openViewPipePopup}
            onCancel={() => setOpenViewPipePopup(false)}
          />
        )}
      </div>
      <div>
        <div id="popup-container"></div>
        {openUpdatePipePopup && selectedPipe && (
          <PipeUpdatePopup
          pipe={selectedPipe}
            onOpen={openUpdatePipePopup}
            onCancel={() => setOpenUpdatePipePopup(false)}
          />
        )}
      </div>
      {/* pipe Popups */}

      {/* pipeaccess Popups */}

      <div>
        <div id="popup-container"></div>
        {openViewPipeaccessPopup && selectedPipeaccess && (
          <PipeAccessViewPopup
            pipeAccess={selectedPipeaccess}
            onOpen={openViewPipeaccessPopup}
            onCancel={() => setOpenViewPipeaccessPopup(false)}
          />
        )}
      </div>
      <div>
        <div id="popup-container"></div>
        {openUpdatePipeaccessPopup && selectedPipeaccess && (
          <PipeAccessUpdatePopup
            pipeAccess={selectedPipeaccess}
            onOpen={openUpdatePipeaccessPopup}
            onCancel={() => setOpenUpdatePipeaccessPopup(false)}
          />
        )}
      </div>
      {/* pipeaccess Popups */}

      {/* zone Popups */}

      <div>
        <div id="popup-container"></div>
        {openViewZonePopup && selectedZone && (
          <ZoneViewPopup
            zone={selectedZone}
            onOpen={openViewZonePopup}
            onCancel={() => setOpenViewZonePopup(false)}
          />
        )}
      </div>
      <div>
        <div id="popup-container"></div>
        {openUpdateZonePopup && selectedZone && (
          <ZoneUpdatePopup
            zone={selectedZone}
            onOpen={openUpdateZonePopup}
            onCancel={() => setOpenUpdateZonePopup(false)}
          />
        )}
      </div>
      {/* zone Popups */}


    </div>
  );
};

export default MapWithSensors;
