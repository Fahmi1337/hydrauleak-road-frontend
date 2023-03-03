import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import ButtonWithPopup from "../../components/mapPopups/contributes/AddButtonPopup"
import RightAddSensorPopup from "../../components/mapPopups/addsensorpopup/AddSensorPopup"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';



import AddMapPopup from '../../components/mapPopups/addmappopup/AddMapPopup'
import MapViewPopup from '../../components/mapPopups/addmappopup/MapViewPopup';
import MapUpdatePopup from '../../components/mapPopups/addmappopup/MapUpdatePopup';



const Map = (props) => {



  
  const [mapsData, setMapsData] = useState([]);
  const [searchCoordinates, setSearchCoordinates] = useState([-71.3583, 50.1686]);
  const [maps, setMaps] = useState([]);

  const [mapCoordinates, setMapCoordinates] = useState([]);



  useEffect(() => {
     //Add Map coordinates to the storage
 window.localStorage.setItem("newMapCoordinates", JSON.stringify(mapCoordinates));
    
 window.dispatchEvent(new Event("mapStorage"));
  }, [mapCoordinates]);


 
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
const getMapsData = e => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
    headers: {
      'Authorization': 'Bearer ' +  localStorage.getItem("token")
    }
  })
  .then((res) => {
    setMapsData(res.data.data);
    setMaps(res.data.data);
})
.catch((err) => {
console.log(err);
});
}

// Get Maps while opening the dashboard
useEffect(() => {
  getMapsData(); 
  }, []);


  console.log("maps data:" ,mapsData )




// map const select delete update
const [selectedMap, setSelectedMap] = useState();
const [openViewMapPopup, setOpenViewMapPopup] = useState(false);
const [openUpdateMapPopup, setOpenUpdateMapPopup] = useState(false);



  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapContainer = React.useRef(null);
  useEffect(() => {

  
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-90.96, -0.47] || mapsData[2]?.map_coordinate || searchCoordinates,
      zoom: 15
    });

    map.on('load', () => {

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

});


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














 

}, [ maps, mapsData, searchCoordinates]);

return (
<div>



<div ref={mapContainer} style={{     width: "150em",
    height: "90em",
    left: "13%",
    top: "4rem", }} />

<div id="addMapInterventionPopup">
      <AddMapPopup openMap={true} handleCancelAddMapContract={props.handleCancelAddMapContract} selectedContract={props.selectedContract}/>
      </div>


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

  <div className="calculation-box">
    <p>Click the map to draw.</p>

    {/* <button onClick={handlePolygonCreated} >Add Map</button> */}
    
 
    <div id="calculated-area"></div>   
  </div>


</div>
);
};





export default Map;
