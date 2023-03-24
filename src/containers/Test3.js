import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from '@turf/turf';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [map, setMap] = useState(null);
  const [line, setLine] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    map.on("load", () => {
      setMap(map);

      map.addSource("line", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer({
        id: "line-layer",
        type: "line",
        source: "line",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    });

    return () => map.remove();
  }, []);

  const drawLine = () => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true,
      },
    });

    map.addControl(draw);

    map.on("draw.create", (e) => {
      const features = e.features;
      const line = features[0];

      setLine(line);

      draw.deleteAll();
    });
  };

  return (
    <>
      <div id="map" style={{ height: "500px" }}></div>
      <button onClick={drawLine}>Draw Line</button>
    </>
  );
};

export default Map;