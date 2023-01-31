import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const [sensorsData, setSensorsData] = useState([]);
  const [pipesData, setPipes] = useState([]);
  const [map, setMap] = useState(null);
const [center, setCoordinates] = useState([-71.3583, 50.1686]);




  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
            headers: {
              'Authorization': 'Bearer' +  localStorage.getItem("token")
            }
          })
          .then((res) => {
            setCoordinates(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pipes/`, {
            headers: {
              'Authorization': 'Bearer' +  localStorage.getItem("token")
            }
          })
          .then((res) => {
        setPipes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
            headers: {
              'Authorization': 'Bearer' +  localStorage.getItem("token")
            }
          })
          .then((res) => {
        setSensorsData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
});
}
}, [sensorsData, pipesData]);

return (
<div>
  <div id="map" style={{ width: '99vw', height: '88vh' }} />
</div>
);
};

export default Map;