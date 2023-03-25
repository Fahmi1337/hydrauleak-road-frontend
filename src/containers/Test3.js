import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lineLength, setLineLength] = useState(null);
  const [lineCoordinates, setLineCoordinates] = useState([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.420679, 37.772537],
        zoom: 13
      });

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          line_string: true,
          trash: true
        },
        userProperties: true // enable user properties for features
      });

      map.current.addControl(draw, 'top-left');

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

    console.log("the pipesss", lineCoordinates, lineLength) 
  }, [lineCoordinates, lineLength]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px' }}
    >
      <div>
        {lineLength && `Length: ${lineLength.toFixed(2)} meters`}
      </div>
      <div>
        {lineCoordinates.length > 0 && `Coordinates: ${JSON.stringify(lineCoordinates)}`}
      </div>
    </div>
  );
};

export default Map;
