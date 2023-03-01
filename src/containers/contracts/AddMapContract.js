// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import * as turf from '@turf/turf'
// import ButtonWithPopup from "../../components/mapPopups/contributes/AddButtonPopup"
// import RightAddSensorPopup from "../../components/mapPopups/addsensorpopup/AddSensorPopup"
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';



// import AddMapPopup from '../../components/mapPopups/addmappopup/AddMapPopup'
// import MapViewPopup from '../../components/mapPopups/addmappopup/MapViewPopup';
// import MapUpdatePopup from '../../components/mapPopups/addmappopup/MapUpdatePopup';
// import './interventions.css'


// const Map = (props) => {



  
//   const [mapsData, setMapsData] = useState([]);
//   const [searchCoordinates, setSearchCoordinates] = useState([-71.3583, 50.1686]);
//   const [maps, setMaps] = useState([]);

//   const [mapCoordinates, setMapCoordinates] = useState([]);



//   useEffect(() => {
//      //Add Map coordinates to the storage
//  window.localStorage.setItem("newMapCoordinates", JSON.stringify(mapCoordinates));
    
//  window.dispatchEvent(new Event("mapStorage"));
//   }, [mapCoordinates]);


 
// const [viewport, setViewport] = useState({
//   latitude: 24.8607,
//   longitude: 67.0011,
//   zoom: 11.4
// });

// // Get search suggestions 
// const getSeatchSuggestions = e => {
//   axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?access_token=pk.eyJ1IjoiZGV2bGlucm9jaGEiLCJhIjoiY2t2bG82eTk4NXFrcDJvcXBsemZzdnJoYSJ9.aq3RAvhuRww7R_7q-giWpA`).then(res => {
//             const { data } = res;
//             console.log({ latitude: viewport.latitude, longitude: viewport.longitude, location: data.features[0].place_name });
//             setSearchCoordinates(data);
           
//         })
// }


// // Get Maps while opening the dashboard

// useEffect(() => {
//   getSeatchSuggestions();
// }, []);


// // // Get the maps coordinates center and details  
// // const getMaps = e => {
// //   axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
// //     headers: {
// //       'Authorization': 'Bearer ' +  localStorage.getItem("token")
// //     }
// //   })
// //   .then((res) => {
// //     setMapsData(res.data.data);
// // })
// // .catch((err) => {
// // console.log(err);
// // });
// // }

// // // Get Maps while opening the dashboard
// // useEffect(() => {
// //     getMaps(); 
// //   }, []);


//   console.log("maps data:" ,mapsData )




// // get map function
//   const getMaps = e => {
//     axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
//       headers: {
//         'Authorization': 'Bearer ' +  localStorage.getItem("token")
//       }
//     })
//     .then((res) => {
//   setMaps(res.data.data);
// })
// .catch((err) => {
//   console.log(err);
// });
//   }

// // map use effect
//   useEffect(() => {
//     getMaps();
//   }, []);



// // map const select delete update
// const [selectedMap, setSelectedMap] = useState();
// const [openViewMapPopup, setOpenViewMapPopup] = useState(false);
// const [openUpdateMapPopup, setOpenUpdateMapPopup] = useState(false);



//   const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
//   const mapContainer = React.useRef(null);
//   useEffect(() => {

  

//     if (mapsData.length > 0) {
//       mapboxgl.accessToken = accessToken;
//       const map = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center:mapsData[2]?.map_coordinate || searchCoordinates,
//         zoom: 12
//       });

//       map.on('load', () => {

//            console.log('centre', searchCoordinates?.features[0]?.center )
//            console.log('centre map',  mapsData[0]?.map_coordinate  )






// // Add Maps to the map
// maps.forEach(map => {
//   map.addSource(map.id.toString(), {
//   type: 'geojson',
//   data: {
//   type: 'Feature',
//   geometry: {
//   type: 'Polygon',
//   coordinates: [map.map_coordinates]
//   }
//   }
//   });
  
//   map.addLayer({
//   id: map.id.toString(),
//   type: 'fill',
//   source: map.id.toString(),
//   layout: {},
//   paint: {
//   'fill-color': map.map_color,
//   'fill-opacity': 0.5
//   }
//   });
  
//   map.addLayer({
//   id: map.id.toString() + 'outline',
//   type: 'line',
//   source: map.id.toString(),
//   layout: {},
//   paint: {
//   'line-color': "black",
//   'line-width': 3
//   }
//   });
  
//   // Add a popup to the map that fetches the id and the coordinates
//   map.on('click', map.id.toString(), (e) => {
//   const popupContent = document.createElement('div');
//   popupContent.innerHTML = `<h3>Title : ${map.map_title}</h3> 
//   <h3>ID : ${map.id}</h3> 
//   <P>Color : ${map.map_color}</P> 
//   <p>Map : ${map.map}</p> 
//   <button id="deleteMap" data-map-id="${map.id}">Delete</button> 
//   <button id="updateMap">Update</button> <button id="viewMap">View</button>` ;
//   new mapboxgl.Popup()
//   .setLngLat(e.lngLat)
//   .setDOMContent(popupContent)
//   .addTo(map);
// // delete Map
// const deleteButton = popupContent.querySelector('#deleteMap');
// deleteButton.addEventListener('click', () => {
//   const mapId = deleteButton.getAttribute('data-map-id');
//   // Send DELETE request to API endpoint using Map id
//   axios.delete(`${process.env.REACT_APP_API_URL}/api/maps/${mapId}/`, {
//     headers: {
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     }
//   })
//   .then(response => {
//     // console.log('Map deleted', response.data);
//     // Remove the Map from the map
//     map.removeLayer(mapId.toString()); // Remove the fill layer
//     map.removeLayer(mapId.toString() + 'outline'); // Remove the outline layer
//     map.removeSource(mapId.toString()); // Remove the source
//   })
//   .catch(error => {
//     console.error('Error deleting Map', error);
//   });
// });

// const updateButton = popupContent.querySelector('#updateMap');
// updateButton.addEventListener('click', () => {
//   // code to open update popup
//   setSelectedMap(map);
//   setOpenUpdateMapPopup(true);
//   // console.log('Update button clicked');
// });

// const viewButton = popupContent.querySelector('#viewMap');
// viewButton.addEventListener('click', () => {
//   setSelectedMap(map);
//   setOpenViewMapPopup(true);
// });
// });
//       // Change the cursor to a pointer when
//       // the mouse is over the states layer.
//       map.on('mouseenter', 'states-layer', () => {
//       map.getCanvas().style.cursor = 'pointer';
//       });
       
//       // Change the cursor back to a pointer
//       // when it leaves the states layer.
//       map.on('mouseleave', 'states-layer', () => {
//       map.getCanvas().style.cursor = '';
//       });


//   });


//   map.on('click', function (e) {
//     map.dragPan.disable();
//     map.dragPan.enable();
//   });

//   map.on('dragend', function (e) {
//     const coordinates = e.target.getBounds().getCenter().toArray();
//     setMapCoordinates(coordinates);
    
//   });

 
//   const draw = new MapboxDraw({
//     displayControlsDefault: false,
//     // Select which mapbox-gl-draw control buttons to add to the map.
   
//     controls: {
//         polygon: true,
//         trash: true
//     },
//     // Set mapbox-gl-draw to draw by default.
//     // The user does not have to click the polygon control button first.
//     // defaultMode: 'draw_polygon'
// });

// map.addControl(draw);

// map.on('draw.create', updateArea);
// map.on('draw.delete', updateArea);
// map.on('draw.update', updateArea);

// function updateArea(e) {
//     const data = draw.getAll();
//     const answer = document.getElementById('calculated-area');
//     if (data.features.length > 0) {
     
//         const area = turf.area(data);
        
 
//         // Restrict the area to 2 decimal points.
//         const rounded_area = Math.round(area * 100) / 100000;
//         answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;

//         setMapCoordinates(data.features[0].geometry.coordinates[0])
//         window.localStorage.setItem("mapArea", rounded_area.toLocaleString());
//         window.dispatchEvent(new Event("mapAreaStorage"));
//     } else {
//         answer.innerHTML = '';
//         if (e.type !== 'draw.delete')
//             alert('Click the map to draw a polygon.');
//     }
   
// }
// });


// }
// }, [ maps, mapsData, searchCoordinates]);

// return (
// <div>



// <div ref={mapContainer} style={{     width: "150em",
//     height: "90em",
//     left: "13%",
//     top: "4rem", }} />

// <div id="addMapInterventionPopup">
//       <AddMapPopup openMap={true}  selectedIntervention={props.selectedIntervention}/>
//       </div>


// {/* map Popups */}

// <div>
//   <div id="popup-container"></div>
//   {openViewMapPopup && selectedMap && (
//     <MapViewPopup
//       map={selectedMap}
//       onOpen={openViewMapPopup}
//       onCancel={() => setOpenViewMapPopup(false)}
//     />
//   )}
// </div>
// <div>
//   <div id="popup-container"></div>
//   {openUpdateMapPopup && selectedMap && (
//     <MapUpdatePopup
//       map={selectedMap}
//       onOpen={openUpdateMapPopup}
//       onCancel={() => setOpenUpdateMapPopup(false)}
//     />
//   )}
// </div>
// {/* map Popups */}

//   <div className="calculation-box">
//     <p>Click the map to draw.</p>

//     {/* <button onClick={handlePolygonCreated} >Add Map</button> */}
    
 
//     <div id="calculated-area"></div>   
//   </div>


// </div>
// );
// };





// export default Map;


import React from 'react'

const AddMapContract = () => {
  return (
    <div>AddMapContract</div>
  )
}

export default AddMapContract