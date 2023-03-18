import React, { useRef, useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA";

const Map = () => {
  const [map, setMap] = useState(null);
  const [showCircle, setShowCircle] = useState(true);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-73.935242, 40.73061],
        zoom: 12,
      });

      map.on("load", () => {
        // Add a red circle layer
        map.addLayer({
          id: "circle",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-73.935242, 40.73061],
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#ff0000",
          },
        });

        setMap(map);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer: mapContainerRef.current });
  }, [map]);

  const toggleShowCircle = useCallback(() => {
    setShowCircle((showCircle) => !showCircle);
  }, []);

  useEffect(() => {
    if (map) {
      if (showCircle) {
        map.setLayoutProperty("circle", "visibility", "visible");
      } else {
        map.setLayoutProperty("circle", "visibility", "none");
      }
    }
  }, [map, showCircle]);

  const mapContainerRef = useRef(null);

  return (
    <div>
      <div
        ref={(el) => (mapContainerRef.current = el)}
        style={{ height: "400px" }}
      />
      <label>
        <input type="checkbox" checked={showCircle} onChange={toggleShowCircle} />
        Show Circle
      </label>
    </div>
  );
};

export default Map;
