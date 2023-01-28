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


  useEffect(() => {
    if (sensorsData.length > 0) {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center[0].map_coordinate,
        zoom: 10
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
          
       
        map.addSource('route', {
          'type': 'geojson',
          'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': [
          [-122.483696, 37.833818],
          [-122.483482, 37.833174],
          [-122.483396, 37.8327],
          [-122.483568, 37.832056],
          [-122.48404, 37.831141],
          [-122.48404, 37.830497],
          [-122.483482, 37.82992],
          [-122.483568, 37.829548],
          [-122.48507, 37.829446],
          [-122.4861, 37.828802],
          [-122.486958, 37.82931],
          [-122.487001, 37.830802],
          [-122.487516, 37.831683],
          [-122.488031, 37.832158],
          [-122.488889, 37.832971],
          [-122.489876, 37.832632],
          [-122.490434, 37.832937],
          [-122.49125, 37.832429],
          [-122.491636, 37.832564],
          [-122.492237, 37.833378],
          [-122.493782, 37.833683]
          ]
          }
          }
          });
      
          map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
          'line-join': 'round',
          'line-cap': 'round'
          },
          'paint': {
          'line-color': '#888',
          'line-width': 8
          }
          });
        });
      setMap(map);
    }
  }, [sensorsData]);

  return (
    <div>
      <div id="map" style={{ width: '99vw', height: '88vh' }} />
    </div>
  );
};

export default Map;