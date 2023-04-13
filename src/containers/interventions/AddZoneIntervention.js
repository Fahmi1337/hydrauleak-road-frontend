import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios';
import layersIcon from "../../assets/icons/layersIcon.png"
import '../../assets/css/mapPopup.css';
import ButtonWithPopup from "../../components/mapPopups/contributes/AddButtonPopup"
import MapLayersPopup from "../../components/mapPopups/mapLayersPopup/MapLayersPopup"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import sensorGreenIcon from '../../assets/icons/sensorGreen.png';
import sensorBlueIcon from '../../assets/icons/sensorBlue.png';
import markIcon from '../../assets/icons/Mark.png';
import mapIcon from '../../assets/icons/Map.png';
import pipeAccessIcon from '../../assets/icons/PipeAccess.png';

import * as turf from '@turf/turf'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import SensorViewPopup from '../../components/mapPopups/addsensorpopup/SensorViewPopup';
import SensorUpdatePopup from '../../components/mapPopups/addsensorpopup/SensorUpdatePopup';

import MarkViewPopup from '../../components/mapPopups/addmarkpopup/MarkViewPopup';
import MarkUpdatePopup from '../../components/mapPopups/addmarkpopup/MarkUpdatePopup';

import PipeAccessViewPopup from '../../components/mapPopups/addpipeaccesspopup/PipeAccessViewPopup';
import PipeAccessUpdatePopup from '../../components/mapPopups/addpipeaccesspopup/PipeAccessUpdatePopup';

import PipeViewPopup from '../../components/mapPopups/addpipepopup/PipeViewPopup';
import PipeUpdatePopup from '../../components/mapPopups/addpipepopup/PipeUpdatePopup';

import ZoneViewPopup from '../../components/mapPopups/addzonepopup/ZoneViewPopup';
import ZoneUpdatePopup from '../../components/mapPopups/addzonepopup/ZoneUpdatePopup';

import MapViewPopup from '../../components/mapPopups/addmappopup/MapViewPopup';
import MapUpdatePopup from '../../components/mapPopups/addmappopup/MapUpdatePopup';

import AddZonePopup from '../../components/mapPopups/addzonepopup/AddZonePopup'

import { useGetMaps, useGetPipes,useGetPipeAccess, useGetMarkers, useGetZones, useGetSensors } from "../../actions/ApiFunctions";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const AddZoneIntervention = (props) => {
  // const [sensorsData, setSensorsData] = useState([]);
  const [showSensors, setShowSensors] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showPipeAccess, setShowPipeAccess] = useState(true);
  const [showMaps, setShowMaps] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showPipes, setShowPipes] = useState(true);
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const sensors = useRef([]);
  const markers = useRef([]);
  const pipesAccess = useRef([]);
  const mapsRef = useRef([]);
  const pipes = useRef([]);
  
  const sensorsData = useGetSensors();
  const markersData = useGetMarkers();
  const pipesAccessData = useGetPipeAccess();
  const mapsData = useGetMaps();
  const pipesData = useGetPipes();
  const zonesData = useGetZones();

  const [submitActive, setSubmitActive] = useState(false);
  const [submitZoneActive, setSubmitZoneActive] = useState(true);
  const [submitPipeActive, setSubmitPipeActive] = useState(false);
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

  const [zoneCoordinates, setZoneCoordinates] = useState([]);
  const [pipeCoordinates, setPipeCoordinates] = useState([]);

  const HandleSetSubmitActive = ()=>{
    setSubmitActive(true);
  }
  const HandleSetSubmitDeactivate = ()=>{
    setSubmitActive(false);
  }
    

  // Get the maps coordinates center and details 
  const [mapCenter, setMapCenter] = useState([]); 

  //  console.log("this is the map center : ", mapCenter[0]);
  const handleMapCenter =(e)=> {
    setMapCenter([e.target.value.split(",").map(parseFloat)])
    localStorage.setItem("mapCenter", [e.target.value.split(",").map(parseFloat)]);
    // window.location.reload();
  }

//Zone
  const [polygon, setPolygon] = useState(null);
  const [area, setArea] = useState(0);

  //Map Layers Popup
  const style = {
    position: 'absolute',
    top: '45%',
    left: '22%',
    
    transform: 'translate(-50%, -50%)',
    width: "auto",
    height: "auto",
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    boxShadow: 24,
    p: 4,
  };
  //POPUP1
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
//POPUP1

const [selectedStyle, setSelectedStyle] = useState('light-v11');

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-71.21088520218619, 46.806343083853875],
        zoom: 12,
      });
      
   
  
      // Navigation Control
      map.current.addControl(
        new mapboxgl.NavigationControl({
          style: "compact",
          zoom: map.current.getZoom(),
          bearing: map.current.getBearing(),
          pitch: map.current.getPitch(),
        }),
        "bottom-right"
      );

      map.current.on('load', () => {
        setMapLoaded(true);
      });
    }

  
    // click handled markers coordinates
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
    
  }, [submitActive, mapClickedCoordinates, polygon, selectedStyle]);
  


  useEffect(() => {

    const localMapCenter = localStorage.getItem('mapCenter')
    if (localMapCenter) {
      
      const mapCenterArray = localMapCenter.split(',').map(str => parseFloat(str));
      console.log("the map localMapCenter array", mapCenterArray);
      console.log("the map localMapCenter", [localMapCenter])
      console.log("the map mapCenter", mapCenter[0])
      map.current.easeTo({
        center: mapCenterArray,
        speed: 0.05,
        curve: 0.1,
        zoom: 15,
      });
      // localStorage.removeItem("mapCenter");
    }

  }, [mapCenter]);
    



  useEffect(() => {

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');
    
    const onClick = (layer) => {

      const layerId = layer.target.id;
      console.log("layerId",layerId)
      localStorage.setItem("selectedStyle", layerId);
      
      
      window.location.reload();
    };
    for (const input of inputs) {
      input.onclick = onClick;
    }

    if (selectedStyle){
    const  localSelectedStyle= localStorage.getItem('selectedStyle')
      setSelectedStyle(localSelectedStyle)
      // console.log("localSelectedStyle",localSelectedStyle)
      map.current.setStyle('mapbox://styles/mapbox/' + localSelectedStyle);
    }

  }, [selectedStyle]);
    

  

  // Draw Zone start
  const [polygonArea, setPolygonArea] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [controlsEnabled, setControlsEnabled] = useState(true);



  useEffect(() => {

    if (mapLoaded && submitZoneActive) {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true, // add polygon drawing tool
          trash: true
        },
        userProperties: true // enable user properties for features
      });

     
 
    
      

      map.current.addControl(draw, 'top-right');
    
      map.current.on('draw.create', () => {
        const { features } = draw.getAll();
        const polygonFeature = features.find(feature => feature.geometry.type === 'Polygon');
        if (polygonFeature) {
          const polygonArea = turf.area(polygonFeature); // turf.js library
          setPolygonArea(polygonArea);
          setPolygonCoordinates(polygonFeature.geometry.coordinates[0]);
        }
      });

      map.current.on('draw.update', () => {
        const { features } = draw.getAll();
        const polygonFeature = features.find(feature => feature.geometry.type === 'Polygon');
        if (polygonFeature) {
          const polygonArea = turf.area(polygonFeature); // turf.js library
          setPolygonArea(polygonArea);
          setPolygonCoordinates(polygonFeature.geometry.coordinates[0]);
        }
      });
    }
  }, [mapLoaded,submitZoneActive]);

  useEffect(() => {

    setZoneCoordinates(polygonCoordinates)
    setArea((polygonArea / 1000000).toFixed(2))
    console.log(
      'the Zonesss km²',
      JSON.stringify(polygonCoordinates),
      (polygonArea / 1000000).toFixed(2)
    );

  
      
    

  }, [controlsEnabled,polygonCoordinates, polygonArea, zoneCoordinates, area]);

  // Draw Zone end
  

 

  // Draw Pipe start
  const [lineLength, setLineLength] = useState(0);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [pipeLength, setPipeLength] = useState(0);



  useEffect(() => {
    if (mapLoaded && submitPipeActive) {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          line_string: true,
          trash: true
        },
        userProperties: true // enable user properties for features
      });

      map.current.addControl(draw, 'top-right');

      map.current.on('draw.create', () => {
        const { features } = draw.getAll();
        const lineFeature = features.find(feature => feature.geometry.type === 'LineString');
        if (lineFeature) {
          const lineLength = turf.length(lineFeature); // turf.js library
          setLineLength(lineLength);
          setLineCoordinates(lineFeature.geometry.coordinates);
        }
      });

      map.current.on('draw.update', () => {
        const { features } = draw.getAll();
        const lineFeature = features.find(feature => feature.geometry.type === 'LineString');
        if (lineFeature) {
          const lineLength = turf.length(lineFeature); // turf.js library
          setLineLength(lineLength);
          setLineCoordinates(lineFeature.geometry.coordinates);
        }
      });
    }
  }, [mapLoaded,submitPipeActive]);

  useEffect(() => {

    setPipeCoordinates(lineCoordinates)
    setPipeLength(lineLength.toFixed(2))
    console.log(
      'the pipess m',
      JSON.stringify(lineCoordinates),
      lineLength
    );
  }, [lineCoordinates, lineLength, pipeCoordinates, pipeLength]);

  // Draw Pipe end




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
        <button id="viewSensor" data-sensor-id="${sensor.id}">View Details</button>
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
          <button id="viewPipeaccess" data-pipeaccess-id="${pipeaccess.id}">View Details</button>
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
          <button id="viewMap" data-map-id="${mapData.id}">View Details</button>
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
                setSelectedMap(mapData);
                setOpenUpdateMapPopup(true);
                // console.log('Update button clicked');
              });
              // View Map
              
              const ViewButton = marker._popup._content.querySelector('#viewMap');
              ViewButton.addEventListener('click', () => {
                setSelectedMap(mapData);
                setOpenViewMapPopup(true);
              });
            });


    }
  }, [mapsData]);
  //MAP HANDLING END






// //ZONE HANDLING START

useEffect(() => {
  
  if (map.current) {
    map.current.on('load', () => {
// Add Zones to the map
zonesData.forEach(zone => {
  map.current.addSource( 'zone-' + zone.id , {
  type: 'geojson',
  data: {
  type: 'Feature',
  geometry: {
  type: 'Polygon',
  coordinates: [zone.zone_coordinates]
  }
  }
  });
  
  map.current.addLayer({
  id: 'zone-' + zone.id,
  type: 'fill',
  source: 'zone-' + zone.id,
  layout: {},
  paint: {
  'fill-color': zone.zone_color,
  'fill-opacity': 0.3
  }
  });
  
  // map.current.addLayer({
  // id: 'zone-' + zone.id + 'outline',
  // type: 'line',
  // source: 'zone-' + zone.id,
  // layout: {},
  // paint: {
  // 'line-color': "black",
  // 'line-width': 3
  // }
  // });
  
  // Add a popup to the zone that fetches the id and the coordinates
  map.current.on('click', 'zone-' + zone.id, (e) => {
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h3>Title : ${zone.zone_title}</h3> 
  <h3>ID : ${zone.id}</h3> 
  <P>Color : ${zone.zone_color}</P> 
  <p>Map : ${zone.map}</p> 
  <button id="deleteZone" data-zone-id="${zone.id}">Delete</button> 
  <button id="updateZone" >Update</button> 
  <button id="viewZone" >View Details</button>` ;
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setDOMContent(popupContent)
  .addTo(map.current);
// delete Zone
const deleteButton = popupContent.querySelector('#deleteZone');
deleteButton.addEventListener('click', () => {
  const zoneId = deleteButton.getAttribute('data-zone-id');
  // Send DELETE request to API endpoint using Zone id
  const confirmation = window.confirm('Are you sure you want to delete this zone?');

  if (!confirmation) {
    return;
  }
  axios.delete(`${process.env.REACT_APP_API_URL}/api/zones/${zoneId}/`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then(response => {
    // console.log('Zone deleted', response.data);
    // Remove the Zone from the map
    map.current.removeLayer(zoneId.toString()); // Remove the fill layer
    map.current.removeLayer(zoneId.toString() + 'outline'); // Remove the outline layer
    map.current.removeSource(zoneId.toString()); // Remove the source
  })
  .catch(error => {
    console.error('Error deleting Zone', error);
  });
});

const updateButton = popupContent.querySelector('#updateZone');
updateButton.addEventListener('click', () => {
  // code to open update popup
  setSelectedZone(zone);
  setOpenUpdateZonePopup(true);
  // console.log('Update button clicked');
});

const viewButton = popupContent.querySelector('#viewZone');
viewButton.addEventListener('click', () => {
  setSelectedZone(zone);
  setOpenViewZonePopup(true);
  popupContent.remove();
});      
});
      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      map.current.on('mouseenter', 'states-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
        });
         
        // Change the cursor back to a pointer
        // when it leaves the states layer.
        map.current.on('mouseleave', 'states-layer', () => {
          map.current.getCanvas().style.cursor = '';
        });    
        
      
});


  }
  )}
 
      }, [zonesData, showZones]);
      //ZONE HANDLING END

      


      const handleShowZone = () => {
        
        zonesData.forEach((zone) => {
    
            if (map.current) {
                if (!showZones) {
                  map.current.setLayoutProperty('zone-'+zone.id, 'visibility', 'visible');
                  map.current.setLayoutProperty('zone-' + zone.id + 'outline', 'visibility', 'visible');
                } else {
                  map.current.setLayoutProperty('zone-'+zone.id, 'visibility', 'none');
                  map.current.setLayoutProperty('zone-' + zone.id + 'outline', 'visibility', 'none');
                }
              }
        })
    
      }




      
  

// //PIPE HANDLING START

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
            // 'visibility': showPipes ? 'visible' : 'none',
          },
          paint: {
            'line-color': '#3284ff',
            'line-width': 3,
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
            // popup.remove(); // close the popup after opening the update popup
        // console.log('Update button clicked');
      });
      
      // Set up event listener for view button
      const viewButton = document.getElementById('viewPipe-' + pipe.id);
      viewButton.addEventListener('click', () => {     
        setSelectedPipe(pipe);
        setOpenViewPipePopup(true);
        
      });      
      })

            
    });
    
    });
    
        }
        
      }, [pipesData, showPipes]);
      //PIPE HANDLING END



      const handleShowPipe = () => {
        
        pipesData.forEach((pipe) => {
    
            if (map.current) {
                if (!showPipes) {
                  map.current.setLayoutProperty('pipe-'+pipe.id, 'visibility', 'visible');
                } else {
                  map.current.setLayoutProperty('pipe-'+pipe.id, 'visibility', 'none');
                }
              }
        })
    
      }


  return (
    <div>
      <div
        className="mapContainerZoneIntervention" 
        ref={mapContainer}
       id="map"
       
      />
            <div id="addZoneInterventionPopup" className = "addZoneInterventionPopupStyle" >
      <AddZonePopup openZone={true} setSubmitZoneActive={true} area = {area} zoneCoordinates={zoneCoordinates} selectedIntervention={props.selectedIntervention} handleCancelAddZoneIntervention={props.handleCancelAddZoneIntervention}/>
      </div>
<style>
        {`
          body {
            margin: 0;
            padding: 0;
          
          }
          #map {
           
            position: absolute;
            top: 0;
            bottom: 0;
            width: 91%;
            right: 0%;
            left: 9.6%;
            zoom:120%;
          }
          #menu {
            position: absolute;
            background: #efefef;
            padding: 10px;
            font-family: 'Open Sans', sans-serif;
          }
        `}
      </style>
      <div className="mapLayersButtonContainer">
      <img src={layersIcon} alt="layers" onClick={handleOpen}/>
      </div>
     
    
      <div id="menu" style={{display: open? "block" : "none"}} className="mapLayersContainer">
        <input id="light-v11" type="radio" name="rtoggle" value="light" defaultChecked />
        <label htmlFor="light-v11">light</label>
        <input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite"/>
        <label htmlFor="satellite-streets-v12">satellite streets</label>
        <input id="dark-v11" type="radio" name="rtoggle" value="dark" />
        <label htmlFor="dark-v11">dark</label>
        <input id="streets-v12" type="radio" name="rtoggle" value="streets" />
        <label htmlFor="streets-v12">streets</label>
        <input id="outdoors-v12" type="radio" name="rtoggle" value="outdoors" />
        <label htmlFor="outdoors-v12">outdoors</label>
      </div>
      <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>

      {/* map Center SELECT */}
          <div  className="selectMapContainer">             
              <select style = {{zIndex: 9999999,left: '50%'}}  type="text"  
                    name="map" onChange={e => handleMapCenter(e)} value={mapCenter.map_coordinate} > <option disabled selected value> -- Select map center -- </option>
                    {mapsData?.map(map => (   
                      <option key={map.map_coordinate} value={map.map_coordinate}>{map.map_title}</option>          
                    ))} 
              </select>          
          </div>
      {/* map Center SELECT */}



    </div>
  );
};

export default AddZoneIntervention;
