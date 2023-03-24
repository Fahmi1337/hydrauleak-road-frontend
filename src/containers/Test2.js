import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const PolygonArea = () => {
  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [area, setArea] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(map);

    map.on("load", () => {
      map.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[]],
          },
        },
      });

      map.addLayer({
        id: "polygon",
        type: "fill",
        source: "polygon",
        paint: {
          "fill-color": "#888",
          "fill-opacity": 0.5,
        },
      });

      map.on("click", (e) => {
        const coordinates = e.lngLat.toArray();
        const polygonCoordinates = polygon ? polygon.geometry.coordinates[0] : [];
        polygonCoordinates.push(coordinates);
        map.getSource("polygon").setData({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [polygonCoordinates],
          },
        });
        setPolygon({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [polygonCoordinates],
          },
        });
      });
    });
  }, []);

  useEffect(() => {
    if (polygon !== null && polygon !== undefined) {
      const area = mapboxgl.turf.area(polygon);
      setArea(area);
    }
  }, [polygon]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>Area: {area}</div>
    </div>
  );
};

export default PolygonArea;
