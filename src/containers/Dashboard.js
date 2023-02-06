import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import ButtonWithPopup from "../components/popups/addpopup/AddButtonPopup"
import RightAddSensorPopup from "../components/popups/addsensorpopup/RightAddSensorPopup"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = (props) => {
  const [sensorsData, setSensorsData] = useState([]);
  const [pipesData, setPipes] = useState([]);
  
  const [center, setCoordinates] = useState([-71.3583, 50.1686]);
  const [searchCoordinates, setSearchCoordinates] = useState([-71.3583, 50.1686]);
  const [zones, setZones] = useState([]);

  const [zoneCoordinates, setZoneCoordinates] = useState([]);



  const [value, setValue] = React.useState('');






 // add sensor by clicking on the maps and a add sensor details


const [runEffect, setRunEffect] = useState(false);
  
const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [marker, setMarker] = useState(null);
  const [addSensor, setAddSensor] = useState(false);
  const [sensorData, setSensorData] = useState({
    sensor_coordinates: [lng, lat],
    sensor_creationdate: new Date().toISOString(),
    sensor_type: "",
    sensor_title: "",
    sensor_description: "",
    sensor_frequency: [],
    sensor_Indication: "unknown",
    map: 2,
  });


  const handleClickSensor = (data) => {
    setAddSensor(true);
  }


 

  const handleClick = (e) => {
    setLng(e.lngLat.lng);
    setLat(e.lngLat.lat);
    // setAddSensor(true);
    console.log("new sensor coordinates", lng, lat);
    window.localStorage.setItem("newSensorLng", e.lngLat.lng);
    window.localStorage.setItem("newSensorLat", e.lngLat.lat);
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddSensor = () => {
    setSensorData({
      ...sensorData,
      sensor_coordinates: [lng, lat],
    });
  };

  const handleSensorDataChange = (e) => {
    setSensorData({
      ...sensorData,
      [e.target.name]: e.target.value,
      sensor_coordinates: [lng, lat]
    });
  };

  const handleSubmitData = () => {


    axios
      .post(`${process.env.REACT_APP_API_URL}/api/sensors/`, sensorData,
      
      {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +   localStorage.getItem("token")
  }}
  
  )    
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setAddSensor(false);
  };

















//add Pipes

// const [lngPipe, setLngPipe] = useState(5);
// const [latPipe, setLatPipe] = useState(34);

// const [runEffectPipe, setRunEffectPipe] = useState(false);
// const [coordinatesPipe, setCoordinatesPipe] = useState([]);



//   const handleClickPipe = (event) => {
//     if (event.lngLat) {
//     setCoordinatesPipe([...coordinatesPipe, [setLngPipe(event.lngLat.lng), setLatPipe(event.lngLat.lat)]]);
//     console.log("pipe coordinates:", coordinatesPipe)
//   }
//   };










function handleChange(event) {
  // console.log(event.target.value);
  getSeatchSuggestions(event.target.value);
  
}
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
            console.log("my center",data)
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
    setCoordinates(res.data.data);
})
.catch((err) => {
console.log(err);
});
}


// Get Maps while opening the dashboard
useEffect(() => {
    getMaps();
  }, []);


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


// Create polygon function (draw zone)
  const handlePolygonCreated = e => {
    e.preventDefault();
    console.log("zone coordinates 2", zoneCoordinates);
  
  //Post Zone Function
  const newzone = { zone_date: '2021-01-01T00:00:00Z', zone_status: 'notStart', zone_color: 'Orange', zone_area: 23.0, zone_coordinates: zoneCoordinates, map: 2 };
  axios.post(`${process.env.REACT_APP_API_URL}/api/zones/`, { zone_status: 'notStart', zone_color: 'orange', zone_area: 23.0, zone_coordinates: zoneCoordinates, map: 2}, 
  {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +   localStorage.getItem("token")
}})
        .then(res => console.log(res))
        .catch(err => console.error(err));
        getZones();
        getZones();
};


 

  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapContainer = React.useRef(null);
  useEffect(() => {
    if (sensorsData.length > 0) {
      mapboxgl.accessToken = accessToken;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: searchCoordinates.features[0].center || center[0].map_coordinate,
        zoom: 12
      });
console.log("map coordinates", center[0].map_coordinate);
console.log("search coordinates", searchCoordinates);
      map.on('load', () => {

    // Add Sensors to the map 
      sensorsData.forEach((sensor) => {
        const marker = new mapboxgl.Marker()
          .setLngLat(sensor.sensor_coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <h3>Sensor title: ${sensor.sensor_title}</h3>
              <p>Sensor description: ${sensor.sensor_description}</p>
              <p>Sensor type: ${sensor.sensor_type}</p>
              <p>Sensor diameter range: ${sensor.sensor_diameter_range}</p>
              <p>Sensor frequency: ${sensor.sensor_frequency}</p>
              <p>Sensor indication: ${sensor.sensor_Indication}</p>
              <p>Pipe: ${sensor.pipe}</p>`))
          .addTo(map);
        });
        
    //Add pipes to the map
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
            'line-width': 3,
          },
        });   
      });




    //Add Zones to the map
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
      console.log("zone colors",  zone.zone_color.toString().trim() );
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


  //Add a popup to the zone that fetch the id and the coordinates
    map.on('click', zone.id.toString(), (e) => {
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`
      <h3>ID : ${zone.id}</h3>
      <p>Map : ${zone.zone_color}</p>
`)
      .addTo(map);
      console.log("my e", zone.id);
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
    console.log("new coordinates", coordinates)
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
        const rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;

        setZoneCoordinates(data.features[0].geometry.coordinates[0])

    } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
            alert('Click the map to draw a polygon.');
    }
    // console.log("area", data);
    // console.log("zone coordinates 1", zoneCoordinates);
}





});
// const addSensorHandler = () => {
//   map.on("click", handleClick);

//   return () => {
//     map.off("click", handleClick);
//   };
// };

// const addMarkerButton = () => {
//   map.on("click", handleClick);
// };

// const removeMarkerButton = () => {
//   map.off("click", handleClick);
// };

if (runEffect) {
  map.on("click", handleClick);

return () => {
  map.off("click", handleClick);
};

}



map.addControl(new mapboxgl.NavigationControl({
  style: 'compact',
  zoom: map.getZoom(),
  bearing: map.getBearing(),
  pitch: map.getPitch(),
}));



map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  
  placeholder: 'Search for location',
      marker: false,
      position: 'top-right',
}));

// map.on('load', () => {
//   map.on('click', handleClickPipe);

//   map.addLayer({
//     id: 'pipe',
//     type: 'line',
//     source: {
//       type: 'geojson',
//       data: {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'LineString',
//           coordinatesPipe,
//         },
//       },
//     },
//     layout: {
//       'line-join': 'round',
//       'line-cap': 'round',
//     },
//     paint: {
//       'line-color': '#888',
//       'line-width': 8,
//     },
//   });
// });

}
}, [sensorsData, pipesData, zones, center, marker, lng, lat, runEffect, searchCoordinates ]);

return (
<div>

<div>
  <label>Search:</label>
  <input name="firstName" onChange={handleChange} />
</div>


      


<ButtonWithPopup data={props.data} handleClickSensor={handleClickSensor} setRunEffect={setRunEffect} getSensors={getSensors}/>
{addSensor && <div>Something showed up!</div>}


<div ref={mapContainer} style={{ width: '99vw', height: '80vh' }} />


  <div className="calculation-box">
    <p>Click the map to draw a polygon.</p>

    <button onClick={handlePolygonCreated} >Add Zone</button>
    
    {addSensor && (
    <RightAddSensorPopup/>
    )}
    <div id="calculated-area"></div>   
  </div>


</div>
);
};





export default Map;