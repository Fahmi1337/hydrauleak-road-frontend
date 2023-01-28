// import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// mapboxgl.accessToken = 'pk.eyJ1IjoiaHlkcmF1bGVhayIsImEiOiJjbGQzOWxwN3YwZzduM3ZueWloenY2bmV2In0.sb2MhxaSXUvO_EqhQWXQLA';
// export default function Dashboard(){
//     const mapContainer = useRef(null);
// const map = useRef(null);
// const [mapInfo, setMap] = useState([]);
// const [lng, setLng] = useState(1);
// const [lat, setLat] = useState(1);
// const [zoom, setZoom] = useState(7.10);

// useEffect(() => {
//     getMap() 
//   }, []);

// useEffect(() => {
// if (map.current) return; // initialize map only once
// map.current = new mapboxgl.Map({
// container: mapContainer.current,
// style: 'mapbox://styles/mapbox/streets-v12',
// center: [lng, lat],
// zoom: zoom
// });
// });
 


// const getMap = async () => {
//     const token = localStorage.getItem('token');
//     axios.defaults.headers = {
//         "Content-Type": "application/json"
//     };
//     axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`,
//     {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': 'Bearer ' + token
//     }
// }
//     ).then(response => {
//         setMap(response.data)
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     }
    


// useEffect(() => {
// if (!map.current) return; // wait for map to initialize
// map.current.on('move', () => {
 
// setLng(map.current.getCenter().lng.toFixed(4));
// setLat(map.current.getCenter().lat.toFixed(4));
// setZoom(map.current.getZoom().toFixed(2));
// });
// });
 





// //    const getMap = async () => {
// //       try {
// //         const response = await fetch(
// //           `${process.env.REACT_APP_API_URL}/api/maps/`,
// //           {
// //             method: "GET",
    
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: "Bearer " + localStorage.getItem("token"),
// //             },
// //           }
// //         )
// //           .then((response) => response.json())
// //           .then((data) => setMap(data));

// //     return response;
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };


// console.log("my map :", mapInfo);


// if(mapInfo){
  
//     console.log("lat :", typeof  parseFloat(mapInfo?.results[0]?.map_coordinate[0]));
//     console.log("lng :", typeof  mapInfo?.results[0]?.map_coordinate[1]);

//     setLng(mapInfo?.results[0]?.map_coordinate[0]);
//     setLat(mapInfo?.results[0]?.map_coordinate[1]);
// }





// return (
// <div>
// <div className="sidebar">
// Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
// </div>

// <div ref={mapContainer} className="map-container" />

// </div>
// );
// }




//NEW CODE


// import React, { useState, useEffect } from 'react';
// import {mapboxgl, Marker} from 'mapbox-gl';
// import axios from 'axios';

// function Map() {
//   const [coordinates, setCoordinates] = useState([]);
//   const [sensors, setSensors] = useState([]);

//   useEffect(() => {
//     // Fetch coordinates from API using axios
//     axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
//         headers: {
//           'Authorization': 'Bearer' +  localStorage.getItem("token")
//         }
//       })
//       .then(response => {
//         const mapCoordinates = response.data.results.map(result => result.map_coordinate);

//         setCoordinates(mapCoordinates);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch coordinates from API using axios
//     axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
//         headers: {
//           'Authorization': 'Bearer' +  localStorage.getItem("token")
//         }
//       })
//       .then(response => {
//         const sensors = response.data.results.map(result => result.sensor_coordinates);
//         setSensors(sensors);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);





 



//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1IjoiaHlkcmF1bGVhayIsImEiOiJjbGQzOWxwN3YwZzduM3ZueWloenY2bmV2In0.sb2MhxaSXUvO_EqhQWXQLA';
//     // Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoiaHlkcmF1bGVhayIsImEiOiJjbGQzOWxwN3YwZzduM3ZueWloenY2bmV2In0.sb2MhxaSXUvO_EqhQWXQLA');
//     const map = new mapboxgl.Map({
//       // accessToken: 'pk.eyJ1IjoiaHlkcmF1bGVhayIsImEiOiJjbGQzOWxwN3YwZzduM3ZueWloenY2bmV2In0.sb2MhxaSXUvO_EqhQWXQLA',
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [0, 0],
//       zoom: 1
//     });
//     map.on('load', () => {
//       sensors.forEach(coordinate => {
//           // Add a marker for each coordinate
//           new mapboxgl.Marker()
//             .setLngLat(coordinate)
//             // .setIcon(`url to your image`)
//             // .setPopup(
//             //   new mapboxgl.Popup({ offset: 25 }) // add popups
//             //     .setHTML(`<h3>${coordinate.sensor_title}</h3><p>${coordinate.sensor_description}</p>`))
//             //     .getElement().addEventListener('click', () => Marker.togglePopup())
//             .addTo(map);
//         });
//       });  
// map.setCenter(coordinates[0]);
// map.setZoom(5);
//     }, [sensors, coordinates]);



   



//     return <div id="map" style={{ height: '400px', width: '100%' }} />;
//   }
  
//   export default Map;




  //NEW CODE







  //ULTRA NEW CODE



  // import React, { useState, useEffect, useRef } from 'react';
  // import mapboxgl from 'mapbox-gl';
  // import 'mapbox-gl/dist/mapbox-gl.css';
  // import axios from 'axios';
  // import red from '../assets/icons/sensor_red_icon.png';
  // import orange from '../assets/icons/sensor_orange_icon.png';
  // import green from '../assets/icons/sensor_green_icon.png';
  // mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';
  // const Map = () => {
  //   // const [map, setMap] = useState(null);
  //   // const [center, setCenter] = useState(null);
  //   // const [markers, setMarkers] = useState([]);
  


  // const [center, setCoordinates] = useState([-71.3583, 50.1686]);
  // const [markers, setSensors] = useState([]);
  // const [sensorsInfo, setSensorsInfo] = useState([]);




  // const mapContainer = useRef(null);
  // const [map, setMap] = useState(null);
  // const [lng, setLng] = useState(1);
  // const [lat, setLat] = useState(1);
  // const [zoom, setZoom] = useState(9);
   




  // useEffect(() => {
  //   // Fetch coordinates from API using axios
  //   axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
  //       headers: {
  //         'Authorization': 'Bearer' +  localStorage.getItem("token")
  //       }
  //     })
  //     .then(response => {
  //       const mapCoordinates = response.data.results.map(result => result.map_coordinate);

  //       setCoordinates(mapCoordinates);
 
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });


  
  //    const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v12',
  //     center: [center[0], center[1]],
  //     zoom: zoom
  //     });
    
  //  map.on('load', () => {
  //       sensorsInfo.forEach((sensor) => {
  //         new mapboxgl.Marker()
  //           .setLngLat(sensor.sensor_coordinates)
  //           .addTo(map);
  //       });
  //     });

  //     setMap(map);
  //   }
  // , [sensorsInfo]);

  // useEffect(() => {
  //   // Fetch coordinates from API using axios
  //   axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
  //       headers: {
  //         'Authorization': 'Bearer' +  localStorage.getItem("token")
  //       }
  //     })
  //     .then(response => {
  //       const sensors = response.data.results.map(result => result.sensor_coordinates);
  //       const sensorsInfo = response.data.results;
  //       setSensors(sensors);
  //       setSensorsInfo(sensorsInfo);

  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);





  




  
  //   return <div ref={mapContainer} className="map-container" id="map" style={{ width: '100vw', height: '100vh' }} />;
  // };
  
  // export default Map;


    //ULTRA NEW CODE





    import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const [sensorsData, setSensorsData] = useState([]);
  const [map, setMap] = useState(null);
const [center, setCoordinates] = useState([-71.3583, 50.1686]);



// useEffect(() => {
//     // Fetch coordinates from API using axios
//     axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
//         headers: {
//           'Authorization': 'Bearer' +  localStorage.getItem("token")
//         }
//       })
//       .then(response => {
//         const mapCoordinates = response.data.results.map(result => result.map_coordinate);

//         setCoordinates(mapCoordinates);
 
//       })
//       .catch(error => {
//         console.log(error);
//       });

   
//     }
//   , []);

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

          // marker.getElement().addEventListener('click', (e) => {
          //   new mapboxgl.Popup()
          //.setHTML(`<h3>${sensor.sensor_title}</h3>
          //     <p>${sensor.sensor_description}</p>
          //     <p>Sensor type: ${sensor.sensor_type}</p>
          //     <p>Sensor diameter range: ${sensor.sensor_diameter_range}</p>
          //     <p>Sensor frequency: ${sensor.sensor_frequency}</p>
          //     <p>Sensor indication: ${sensor.sensor_Indication}</p>
          //     <p>Pipe: ${sensor.pipe}</p>`)
          //     .addTo(map);
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