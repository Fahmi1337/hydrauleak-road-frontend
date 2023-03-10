import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import ButtonWithPopup from "../components/mapPopups/contributes/AddButtonPopup"
import RightAddSensorPopup from "../components/mapPopups/addsensorpopup/AddSensorPopup"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import ReactDOM from 'react-dom';


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

import Loader from 'rsuite/Loader';

const Map = (props) => {
  const [sensorsData, setSensorsData] = useState([]);
  const [markersData, setMarkersData] = useState([]);
  const [pipesData, setPipes] = useState([]);
  const [pipesAccessData, setPipeAcess] = useState([]);

  const [map, setMap] = useState(null);
  
  const [mapsData, setMapsData] = useState([]);
  const [searchCoordinates, setSearchCoordinates] = useState([-71.3583, 50.1686]);
  const [zones, setZones] = useState([]);

  const [zoneCoordinates, setZoneCoordinates] = useState([]);



  // const [value, setValue] = React.useState('');






// add Pipes


const [runEffectZone, setRunEffectZone] = useState(false);



const [runEffectPipe, setRunEffectPipe] = useState(false);
const [coordinatesPipe, setCoordinatesPipe] = useState([]);



  const handleClickPipe = (event) => {
    if (event.lngLat) {
    setCoordinatesPipe([...coordinatesPipe, [(event.lngLat.lng), (event.lngLat.lat)]]);
  }
  };

  useEffect(() => {
    //Add Pipe coordinates to the storage
 window.localStorage.setItem("newCoordinates", JSON.stringify(coordinatesPipe));
    
    window.dispatchEvent(new Event("storage"));

 }, [coordinatesPipe]);

  useEffect(() => {
     //Add Zone coordinates to the storage
 window.localStorage.setItem("newZoneCoordinates", JSON.stringify(zoneCoordinates));
    
 window.dispatchEvent(new Event("zoneStorage"));
  }, [zoneCoordinates]);




 // add sensor by clicking on the maps and a add sensor details


const [runEffectSensor, setRunEffectSensor] = useState(false);
  
const [lng, setLng] = useState(parseFloat(localStorage.getItem("newSensorLng")));
  const [lat, setLat] = useState(parseFloat(localStorage.getItem("newSensorLat")));
  const [marker, setMarker] = useState(null);
  const [addSensor, setAddSensor] = useState(false);



  const handleClickSensor = (data) => {
    setAddSensor(true);
  }


 // Storage Point coordinates

  const handleClick = (e) => {
    setLng(e.lngLat.lng);
    setLat(e.lngLat.lat);
    // setAddSensor(true);
  
    window.localStorage.setItem("newSensorLng", e.lngLat.lng);
    window.localStorage.setItem("newSensorLat", e.lngLat.lat);
    window.dispatchEvent(new Event("storage"));
  };

  const handleClickCenter = (e) => {
    setLng(e.lngLat.lng);
    setLat(e.lngLat.lat);
 
  
    window.localStorage.setItem("newSensorLng", e.lngLat.lng);
    window.localStorage.setItem("newSensorLat", e.lngLat.lat);
    window.dispatchEvent(new Event("storage"));
  };





const [viewport, setViewport] = useState({
  latitude: 24.8607,
  longitude: 67.0011,
  zoom: 11.4
});

// Get search suggestions 
const getSeatchSuggestions = e => {
  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?access_token=pk.eyJ1IjoiZGV2bGlucm9jaGEiLCJhIjoiY2t2bG82eTk4NXFrcDJvcXBsemZzdnJoYSJ9.aq3RAvhuRww7R_7q-giWpA`).then(res => {
            const { data } = res;
            console.log({ latitude: viewport.latitude, longitude: viewport.longitude, location: data.features[0].place_name });
            setSearchCoordinates(data);
           
        })
}


// Get Maps while opening the dashboard

useEffect(() => {
  getSeatchSuggestions();
}, []);








// Get the maps coordinates center and details 
const [mapCenter, setMapCenter] = useState([]); 

 console.log("this is the map center : ", mapCenter[0]);
const handleMapCenter =(e)=> {
  setMapCenter([e.target.value.split(",").map(parseFloat)])
}
const getMaps = e => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
    headers: {
      'Authorization': 'Bearer ' +  localStorage.getItem("token")
    }
  })
  .then((res) => {
    setMapsData(res.data.data);
})
.catch((err) => {
console.log(err);
});
}

// Get Maps while opening the dashboard
useEffect(() => {
    getMaps(); 
  }, []);


  console.log("maps data:" ,mapsData )

// Get Pipes function 
const getPipes = e => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pipes/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
  setPipes(res.data.data);
})
.catch((err) => {
  console.log(err);
});
  }
// Pipe use effect
  useEffect(() => {
    getPipes();
  }, []);

  console.log("pipe data:" ,pipesData )

  // Get Pipes function 
  const getPipeAccess = e => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/pipeacces/`, {
        headers: {
          'Authorization': 'Bearer ' +  localStorage.getItem("token")
        }
      })
      .then((res) => {
    setPipeAcess(res.data.data);
  })
  .catch((err) => {
    console.log(err);
  });
    }
  // Pipe use effect
    useEffect(() => {
      getPipeAccess();
    }, []);



// get zone function
  const getZones = e => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/zones/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
  setZones(res.data.data);
})
.catch((err) => {
  console.log(err);
});
  }

// zone use effect
  useEffect(() => {
    getZones();
  }, []);

// get sensors function
  const getSensors = e => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
  setSensorsData(res.data.data);
})
.catch((err) => {
  console.log(err);
});
  }
// sensors use effect 
  useEffect(() => {
    getSensors();
  }, []);


  // get marks function
  const getMarkers = e => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/marks/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
  setMarkersData(res.data.data);
})
.catch((err) => {
  console.log(err);
});
  }
// marks use effect 
  useEffect(() => {
    getMarkers();
  }, []);

 
console.log("runEffectZone?", runEffectZone)
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



  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapContainer = React.useRef(null);
  

  // const newAddSensor = () => {
  //   const newMarker = new mapboxgl.Marker()
  //     .setLngLat(map.getCenter())
  //     .addTo(map);

  //   setMarker(newMarker);
  // };

  
  useEffect(() => {

  

    
      mapboxgl.accessToken = accessToken;
      
      const map = new mapboxgl.Map({
        
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        // center:  mapsData[2]?.map_coordinate || [lng, lat] || searchCoordinates || [0, 0],
        center:  [0, 0] || searchCoordinates,
        zoom: 15
      });
      setMap(map);
      map.on('load', () => {


        if (mapsData[2]?.map_coordinate){
          map.easeTo({
            center: mapsData[2]?.map_coordinate,
            speed: 0.05,
            curve: 0.1,
            zoom : map.getZoom(),
          });
        }

        if (lat){
          map.easeTo({
            center: [lng, lat],
            speed: 0.05,
            curve: 0.1,
            zoom : map.getZoom(),
          });
          
        }
     
if(mapCenter){
  map.easeTo({
    center: mapCenter[0],
    speed: 0.05,
    curve: 0.1,
    zoom : map.getZoom(),
  });
}

          //  console.log('centre', searchCoordinates?.features[0]?.center )
           console.log('centre map',  mapsData[2]?.map_coordinate  )

// Add Maps to the map 
mapsData.forEach((maps) => {
  console.log("map data 1 :", maps)
  const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
    <h3>ID: ${maps.id}</h3>  
    <h3>Map title: ${maps.map_title}</h3>
   
    <p>Map description: ${maps.map_description}</p>

    <button id="deleteMap" data-map-id="${maps.id}">Delete</button>
    <button id="updateMap" data-map-id="${maps.id}">Update</button>
    <button id="viewMap" data-map-id="${maps.id}">View</button>
  `);
  const marker = new mapboxgl.Marker({
    draggable: false,
    color: "#f6ff00",
  })
    .setLngLat(maps.map_coordinate)
    .setPopup(popup)
    .addTo(map);

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
    setSelectedMap(maps);
    setOpenUpdateMapPopup(true);
    // console.log('Update button clicked');
  });
  // View Map
  
  const ViewButton = marker._popup._content.querySelector('#viewMap');
  ViewButton.addEventListener('click', () => {
    setSelectedMap(maps);
    setOpenViewMapPopup(true);
  });
});




// Add Sensors to the map 
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
  const marker = new mapboxgl.Marker()
    .setLngLat(sensor.sensor_coordinates)
    .setPopup(popup)
    .addTo(map);

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
});



// Add Markers to the map
markersData.forEach((mark) => {
  const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
  <h3>mark title: ${mark.mark_title}</h3>
  <h3>ID: ${mark.id}</h3>
  <p>mark description: ${mark.mark_description}</p>
  <p>Pipe: ${mark.pipe}</p>
  <button id="deleteMark" data-mark-id="${mark.id}">Delete</button>
  <button id="updateMark" data-mark-id="${mark.id}">Update</button>
  <button id="viewMark" data-mark-id="${mark.id}">View Details</button>
`);
  const mymarker = new mapboxgl.Marker({
    draggable: false,
    color: "#D80739",
  })
    .setLngLat(mark.mark_coordinates)
    .setPopup(popup)
    .addTo(map);

  // Delete Mark
  const deleteButton = mymarker._popup._content.querySelector('#deleteMark');
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
      mymarker.remove();
    })
    .catch(error => {
      console.error('Error deleting Mark', error);
    });
  });

  // Update Mark
  const updateButton = mymarker._popup._content.querySelector('#updateMark');
  updateButton.addEventListener('click', () => {
    // code to open update popup
    setSelectedMark(mark);
    setOpenUpdateMarkPopup(true);
    // console.log('Update button clicked');
  });

  // View Mark
  const viewButton = mymarker._popup._content.querySelector('#viewMark');
  viewButton.addEventListener('click', () => {
    setSelectedMark(mark);
    setOpenViewMarkPopup(true);
  });
});





//pipe access code

// Add Pipe access to the map
pipesAccessData.forEach((pipeaccess) => {
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
draggable: false,
color: "#48c450",
})
.setLngLat(pipeaccess.pipe_access_coordinates)
.setPopup(popup)
.addTo(map);

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




// Add pipe to the map
pipesData.forEach((pipe) => {
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
  map.addSource('pipe-' + pipe.id, {
  type: 'geojson',
  data: pipeFeature,
  });
  map.addLayer({
  id: 'pipe-' + pipe.id,
  type: 'line',
  source: 'pipe-' + pipe.id,
  layout: {
  'line-join': 'round',
  'line-cap': 'round',
  },
  paint: {
  'line-color': '#3284ff',
  'line-width': 10,
  },
  });
  map.on('click', 'pipe-' + pipe.id, (e) => {
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h3>Pipe title: ${pipe.pipe_title}</h3> 
  <h3>ID : ${pipe.id}</h3> 
  <p>Pipe description: ${pipe.pipe_description}</p> 
  <p>Pipe type: ${pipe.pipe_type}</p> 
  
  <p>Pipe status: ${pipe.pipe_status}</p> 
  <p>Pipe length: ${pipe.pipe_length}</p> 
  <button id="deletePipe" data-pipe-id="${pipe.id}">Delete</button> 
  <button id="updatePipe" data-pipe-id="${pipe.id}">Update</button> 
  <button id="viewPipe" data-pipe-id="${pipe.id}">View Details</button>` ;
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setDOMContent(popupContent)
  .addTo(map);
  localStorage.setItem("selectedPipeId",pipe.id);

  //delete pipe
  const deleteButton = document.getElementById('deletePipe');
  deleteButton.addEventListener('click', () => {
    const pipeId = deleteButton.getAttribute('data-pipe-id');
    // Send DELETE request to API endpoint using Pipe id
    const confirmation = window.confirm('Are you sure you want to delete this pipe?');

  if (!confirmation) {
    return;
  }
    axios.delete(`${process.env.REACT_APP_API_URL}/api/pipes/${pipeId}/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      // console.log('Pipe deleted', response.data);
      // Remove the Pipe from the map
      map.removeLayer('pipe-' + pipe.id);
      map.removeSource('pipe-' + pipe.id);
    })
    .catch(error => {
      console.error('Error deleting Pipe', error);
    });
  });
  
  // Set up event listener for update button
  const updateButton = document.getElementById('updatePipe');
  updateButton.addEventListener('click', () => {
    // code to open update popup
    setSelectedPipe(pipe);
    setOpenUpdatePipePopup(true);
    // console.log('Update button clicked');
  });
  
  // Set up event listener for view button
  const viewButton = document.getElementById('viewPipe');
  viewButton.addEventListener('click', () => {     
    setSelectedPipe(pipe);
    setOpenViewPipePopup(true);
  });      
});
});





// Add Zones to the map
zones.forEach(zone => {
  map.addSource(zone.id.toString(), {
  type: 'geojson',
  data: {
  type: 'Feature',
  geometry: {
  type: 'Polygon',
  coordinates: [zone.zone_coordinates]
  }
  }
  });
  
  map.addLayer({
  id: zone.id.toString(),
  type: 'fill',
  source: zone.id.toString(),
  layout: {},
  paint: {
  'fill-color': zone.zone_color,
  'fill-opacity': 0.5
  }
  });
  
  map.addLayer({
  id: zone.id.toString() + 'outline',
  type: 'line',
  source: zone.id.toString(),
  layout: {},
  paint: {
  'line-color': "black",
  'line-width': 3
  }
  });
  
  // Add a popup to the zone that fetches the id and the coordinates
  map.on('click', zone.id.toString(), (e) => {
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h3>Title : ${zone.zone_title}</h3> 
  <h3>ID : ${zone.id}</h3> 
  <P>Color : ${zone.zone_color}</P> 
  <p>Map : ${zone.map}</p> 
  <button id="deleteZone" data-zone-id="${zone.id}">Delete</button> 
  <button id="updateZone">Update</button> <button id="viewZone">View</button>` ;
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setDOMContent(popupContent)
  .addTo(map);
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
    map.removeLayer(zoneId.toString()); // Remove the fill layer
    map.removeLayer(zoneId.toString() + 'outline'); // Remove the outline layer
    map.removeSource(zoneId.toString()); // Remove the source
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
});
});
      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      map.on('mouseenter', 'states-layer', () => {
      map.getCanvas().style.cursor = 'pointer';
      });
       
      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.on('mouseleave', 'states-layer', () => {
      map.getCanvas().style.cursor = '';
      });


  });


  map.on('click', function (e) {
    map.dragPan.disable();
    map.dragPan.enable();
  });

  map.on('dragend', function (e) {
    const coordinates = e.target.getBounds().getCenter().toArray();
    setZoneCoordinates(coordinates);
    
  });


  const draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
   
    controls: {
        polygon: runEffectZone,
        trash: runEffectZone
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    // defaultMode: 'draw_polygon'
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
    const data = draw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
     
        const area = turf.area(data);
        
 
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100000;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;

        setZoneCoordinates(data.features[0].geometry.coordinates[0])
        window.localStorage.setItem("zoneArea", rounded_area.toLocaleString());
        window.dispatchEvent(new Event("zoneAreaStorage"));
    } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
            alert('Click the map to draw a polygon.');
    }
   
}

 console.log("runEffectZone2",runEffectZone)


});




  if (runEffectPipe){
  

 

  const geojson = {
    'type': 'FeatureCollection',
    'features': []
    };
     
    // Used to draw a line between points
    const linestring = {
    'type': 'Feature',
    'geometry': {
    'type': 'LineString',
    'coordinates': []
    }
    };
    map.on('load', () => {
    map.addSource('geojson', {
      'type': 'geojson',
      'data': geojson
      });
       
      // Add styles to the map
      map.addLayer({
      id: 'measure-points',
      type: 'circle',
      source: 'geojson',
      paint: {
      'circle-radius': 5,
      'circle-color': 'blue'
      },
      filter: ['in', '$type', 'Point']
      });
      map.addLayer({
      id: 'measure-lines',
      type: 'line',
      source: 'geojson',
      layout: {
      'line-cap': 'round',
      'line-join': 'round'
      },
      paint: {
      'line-color': 'blue',
      'line-width': 2.5
      },
      filter: ['in', '$type', 'LineString']
      });
      window.localStorage.removeItem("newCoordinates");
      map.on('click', (e) => {
          
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points']
      });
       
      // Remove the linestring from the group
      // so we can redraw it based on the points collection.
      if (geojson.features.length > 1) geojson.features.pop();
       
      // Clear the distance container to populate it with a new value.
   
       
      // If a feature was clicked, remove it from the map.
      if (features.length) {
      const id = features[0].properties.id;
      geojson.features = geojson.features.filter(
      (point) => point.properties.id !== id
      );
      } else {
      const point = {
      'type': 'Feature',
      'geometry': {
      'type': 'Point',
      'coordinates': [e.lngLat.lng, e.lngLat.lat]
      },
      'properties': {
      'id': String(new Date().getTime())
      }
      };
       
      geojson.features.push(point);
      }
       
      if (geojson.features.length > 0) {
      linestring.geometry.coordinates = geojson.features.map(
      (point) => point.geometry.coordinates
      );
       
      geojson.features.push(linestring);
       
      // Populate the distanceContainer with total distance
      const value = document.createElement('pre');
      const distance = turf.length(linestring);
      value.textContent = `Total distance: ${distance.toLocaleString()}km`;
      // console.log("values :", value )
      // distanceContainer.appendChild(value);
      window.localStorage.setItem("pipeLength", distance.toLocaleString());
      
      window.dispatchEvent(new Event("pipeLengthStorage"));
      }
       
      map.getSource('geojson').setData(geojson);


      coordinatesPipe.push([e.lngLat.lng, e.lngLat.lat]);
      
    
      window.localStorage.setItem("newCoordinates", JSON.stringify(linestring.geometry.coordinates));
      
      window.dispatchEvent(new Event("storage"));
      });
    });
      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
        });
        // Change the cursor to a pointer when hovering over a point on the map.
        // Otherwise cursor is a crosshair.
        map.getCanvas().style.cursor = features.length
        ? 'pointer'
        : 'crosshair';
        });

  }



//runEffectSensor
if (runEffectSensor) {
  map.on("click", handleClick);

return () => {
  map.off("click", handleClick);
};

}


// Navigation Control
map.addControl(new mapboxgl.NavigationControl({
  style: 'compact',
  zoom: map.getZoom(),
  bearing: map.getBearing(),
  pitch: map.getPitch(),
}),'bottom-right');


//Map search Geocoder
map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  
  placeholder: 'Search for location',
      marker: false,
      position: 'top-right',
}),'top-left');






 //UPDATE CENTER ONCLICK

  map.on("click", handleClickCenter);

return () => {
  map.off("click", handleClickCenter);
};






}
, [ pipesData, pipesAccessData, zones, mapsData, searchCoordinates, coordinatesPipe, runEffectPipe, runEffectZone, runEffectSensor, mapCenter]);

return (
<div>

{/* <div>
  <label>Search:</label>
  <input name="firstName" onChange={handleChange} />
</div> */}


      


<ButtonWithPopup  data={props.data} handleClickSensor={handleClickSensor} setRunEffectSensor={setRunEffectSensor} getSensors={getSensors} setRunEffectPipe={setRunEffectPipe} setRunEffectZone={setRunEffectZone}/>
{/* {addSensor && <div>Something showed up!</div>} */}


<div ref={mapContainer} style={{ width: '225em', height: '124em',left: '21em',top: '-10px' }} />


{/* map Center SELECT */}
<div  className="selectMapContainer">
              
             
            <select style = {{

zIndex: 9999999,left: '50%'
}}  type="text"  
                  name="map" onChange={e => handleMapCenter(e)} value={mapCenter.map_coordinate} >
                  {mapsData?.map(map => (
                    
                  <option key={map.map_coordinate} value={map.map_coordinate}>{map.map_title}</option>          
                  ))} 
            </select>
            
        </div>
{/* map Center SELECT */}


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





export default Map;