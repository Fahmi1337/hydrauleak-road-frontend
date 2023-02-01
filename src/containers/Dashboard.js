import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'

const Map = () => {
  const [sensorsData, setSensorsData] = useState([]);
  const [pipesData, setPipes] = useState([]);
const [center, setCoordinates] = useState([-71.3583, 50.1686]);
const [zones, setZones] = useState([]);

const [zoneCoordinates, setZoneCoordinates] = useState([]);


 
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


  useEffect(() => {
    getMaps();
  }, []);



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


  useEffect(() => {
    getPipes();
  }, []);



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


  useEffect(() => {
    getZones();
  }, []);


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

  useEffect(() => {
    getSensors();
  }, []);



  const handlePolygonCreated = e => {
    e.preventDefault();
    console.log("zone coordinates 2", zoneCoordinates);
    
    const newzone = { zone_date: '2021-01-01T00:00:00Z', zone_status: 'notStart', zone_color: 'Red', zone_area: 23.0, zone_coordinates: zoneCoordinates, map: 2 };
    axios.post(`${process.env.REACT_APP_API_URL}/api/zones/`, { zone_status: 'notStart', zone_color: 'red', zone_area: 23.0, zone_coordinates: zoneCoordinates, map: 2}, 
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
  useEffect(() => {
    if (sensorsData.length > 0) {
      mapboxgl.accessToken = accessToken;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center[0].map_coordinate,
        zoom: 12
      });

      map.on('load', () => {
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
}
}, [sensorsData, pipesData, zones, center]);





return (
<div>
  <div id="map" style={{ width: '99vw', height: '88vh' }} />
  <div class="calculation-box">
    <p>Click the map to draw a polygon.</p>
    <button onClick={handlePolygonCreated} >add Zone</button>
    <div id="calculated-area"></div>
</div>

</div>
);
};

export default Map;