import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import ButtonWithPopup from "../../components/mapPopups/contributes/AddButtonPopup"
import RightAddSensorPopup from "../../components/mapPopups/addsensorpopup/AddSensorPopup"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';



import AddZonePopup from '../../components/mapPopups/addzonepopup/AddZonePopup'
import ZoneViewPopup from '../../components/mapPopups/addzonepopup/ZoneViewPopup';
import ZoneUpdatePopup from '../../components/mapPopups/addzonepopup/ZoneUpdatePopup';
import './interventions.css'


const Map = (props) => {



  
  const [mapsData, setMapsData] = useState([]);
  const [searchCoordinates, setSearchCoordinates] = useState([-71.3583, 50.1686]);
  const [zones, setZones] = useState([]);

  const [zoneCoordinates, setZoneCoordinates] = useState([]);



  useEffect(() => {
     //Add Zone coordinates to the storage
 window.localStorage.setItem("newZoneCoordinates", JSON.stringify(zoneCoordinates));
    
 window.dispatchEvent(new Event("zoneStorage"));
  }, [zoneCoordinates]);


 
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



// zone const select delete update
const [selectedZone, setSelectedZone] = useState();
const [openViewZonePopup, setOpenViewZonePopup] = useState(false);
const [openUpdateZonePopup, setOpenUpdateZonePopup] = useState(false);



  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapContainer = React.useRef(null);
  useEffect(() => {

  

    if (mapsData.length > 0) {
      mapboxgl.accessToken = accessToken;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center:mapsData[2]?.map_coordinate || searchCoordinates,
        zoom: 12
      });

      map.on('load', () => {

           console.log('centre', searchCoordinates?.features[0]?.center )
           console.log('centre map',  mapsData[0]?.map_coordinate  )






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
        polygon: true,
        trash: true
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
});


}
}, [ zones, mapsData, searchCoordinates]);

return (
<div>



<div ref={mapContainer} style={{     width: "150em",
    height: "90em",
    left: "13%",
    top: "4rem", }} />

<div id="addZoneInterventionPopup">
      <AddZonePopup openZone={true}  selectedIntervention={props.selectedIntervention}/>
      </div>


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

  <div className="calculation-box">
    <p>Click the map to draw.</p>

    {/* <button onClick={handlePolygonCreated} >Add Zone</button> */}
    
 
    <div id="calculated-area"></div>   
  </div>


</div>
);
};





export default Map;