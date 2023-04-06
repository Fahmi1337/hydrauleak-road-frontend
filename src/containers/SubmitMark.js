import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN_HERE";

const Map = ({ children }) => {
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
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: "400px", width: "100%" }}
    >
      {children}
    </div>
  );
};

export default Map;