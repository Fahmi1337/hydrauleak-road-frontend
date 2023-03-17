import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const SubmitMark = () => {
  const [popup, setPopup] = useState(null);
  const [submitActive, setSubmitActive] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-71.21088520218619, 46.806343083853875],
        zoom: 12,
      });

      map.current.on("click", e => {
        if (submitActive) {
          const lngLat = [e.lngLat.lng, e.lngLat.lat];
          const newMarker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);

          const newPopup = new mapboxgl.Popup().setLngLat(lngLat).setHTML(`Coordinates: ${lngLat}`).addTo(map.current);

          setPopup(newPopup);
        }
      });
    }
  }, [submitActive]);

  const handleSubmit = () => {
    if (popup) {
      popup.remove();
    }
  };

  return (
    <div>
      <button onClick={() => setSubmitActive(!submitActive)}>Activate Submit Mark</button>
      <button onClick={handleSubmit}>Submit Marker</button>
      <div
        ref={mapContainer}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default SubmitMark;
