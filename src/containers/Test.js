import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const Test = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [marker, setMarker] = useState(null);
  const [line, setLine] = useState(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4194, 37.7749],
      zoom: 12,
    });

    setMap(newMap);

    return () => newMap.remove();
  }, []);

  const addMarker = () => {
    const newMarker = new mapboxgl.Marker()
      .setLngLat(map.getCenter())
      .addTo(map);

    setMarker(newMarker);
  };

  const addLine = () => {
    const newLine = new mapboxgl.Draw({
      type: 'line',
      displayControlsDefault: true,
      controls: {
        point: true,
        trash: true,
      },
    });

    map.addControl(newLine);

    newLine.on('create', (e) => {
      setLine(e.features[0]);
      map.removeControl(newLine);
    });

    newLine.changeMode('draw');
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
      <button onClick={addMarker}>Add Marker</button>
      <button onClick={addLine}>Add Line</button>
    </div>
  );
};

export default Test;