import React, { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const PolygonAreaCalculator = () => {
  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const mapContainer = useRef(null);

  const drawPolygon = () => {
    // Create a new polygon object
    const newPolygon = new mapboxgl.Draw({
      type: "polygon",
      // Set the polygon mode to 'simple_select'
      // to enable selection and editing of existing polygons
      mode: "simple_select",
      // Set the style of the polygon
      // You can customize the style to fit your needs
      style: {
        fill: {
          color: "#c7e9b4",
          opacity: 0.5,
        },
        stroke: {
          color: "#3b3b3b",
          width: 2,
        },
      },
    });

    // Add the polygon object to the map
    map.addControl(newPolygon);

    // Listen for the polygon creation event
    map.on("draw.create", (event) => {
      // Save the created polygon to the state
      setPolygon(event.features[0]);

      // Remove the draw control
      map.removeControl(newPolygon);
    });

    // Listen for the polygon update event
    map.on("draw.update", (event) => {
      // Save the updated polygon to the state
      setPolygon(event.features[0]);
    });
  };

  const calculatePolygonArea = () => {
    if (!polygon) {
      alert("Please draw a polygon first!");
      return;
    }

    // Get the coordinates of the polygon
    const coordinates = polygon.geometry.coordinates[0];

    // Calculate the area of the polygon using the Shoelace formula
    let area = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      area += coordinates[i][0] * coordinates[i + 1][1];
      area -= coordinates[i + 1][0] * coordinates[i][1];
    }
    area = Math.abs(area / 2);

    alert(`The area of the polygon is ${area} square meters.`);
  };

  // Initialize the map when the component mounts
  React.useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    setMap(newMap);

    return () => newMap.remove();
  }, []);



  React.useEffect(() => {
     // Create a new polygon object
     const newPolygon = new mapboxgl.Draw({
      type: "polygon",
      // Set the polygon mode to 'simple_select'
      // to enable selection and editing of existing polygons
      mode: "simple_select",
      // Set the style of the polygon
      // You can customize the style to fit your needs
      style: {
        fill: {
          color: "#c7e9b4",
          opacity: 0.5,
        },
        stroke: {
          color: "#3b3b3b",
          width: 2,
        },
      },
    });

    // Add the polygon object to the map
    map.addControl(newPolygon);

    // Listen for the polygon creation event
    map.on("draw.create", (event) => {
      // Save the created polygon to the state
      setPolygon(event.features[0]);

      // Remove the draw control
      map.removeControl(newPolygon);
    });

    // Listen for the polygon update event
    map.on("draw.update", (event) => {
      // Save the updated polygon to the state
      setPolygon(event.features[0]);
    });



    if (!polygon) {
      alert("Please draw a polygon first!");
      return;
    }

    // Get the coordinates of the polygon
    const coordinates = polygon.geometry.coordinates[0];

    // Calculate the area of the polygon using the Shoelace formula
    let area = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      area += coordinates[i][0] * coordinates[i + 1][1];
      area -= coordinates[i + 1][0] * coordinates[i][1];
    }
    area = Math.abs(area / 2);

    alert(`The area of the polygon is ${area} square meters.`);

  }, []);


  return (
    <>
      <div ref={mapContainer} style={{ height: "500px" }} />
      <button onClick={drawPolygon}>Draw a Polygon</button>
      <button onClick={calculatePolygonArea}>Calculate Area</button>
    </>
  );
};

export default PolygonAreaCalculator;
