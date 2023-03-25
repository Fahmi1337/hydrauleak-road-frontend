import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [polygonArea, setPolygonArea] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.420679, 37.772537],
        zoom: 13
      });

      map.current.on('load', () => {
        setMapLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true, // add polygon drawing tool
          trash: true
        },
        userProperties: true // enable user properties for features
      });

      map.current.addControl(draw, 'top-left');

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
  }, [mapLoaded]);

  useEffect(() => {
    console.log(
      'the Zonesss km²',
      JSON.stringify(polygonCoordinates),
      (polygonArea / 1000000).toFixed(2)
    );
  }, [polygonCoordinates, polygonArea]);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div>
      <div>
        <button onClick={toggleControls}>{showControls ? 'Hide' : 'Show'} controls</button>
      </div>
      {showControls && (
        <div ref={mapContainer} style={{ width: '100%', height: '500px' }}>
          <div>{polygonArea && `Area: ${(polygonArea / 1000000).toFixed(2)} hectares`}</div>
          <div>
            {polygonCoordinates.length > 0 && `Coordinates: ${JSON.stringify(polygonCoordinates)}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
