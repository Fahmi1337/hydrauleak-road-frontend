import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const Test = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [marker, setMarker] = useState(null);
  const [line, setLine] = useState(null);

  const [sensorsData, setSensorsData] = useState([]);
//sensor const select delete update 
const [selectedSensor, setSelectedSensor] = useState();
const [openViewSensorPopup, setOpenViewSensorPopup] = useState(false);
const [openUpdateSensorPopup, setOpenUpdateSensorPopup] = useState(false);




const [checked, setChecked] = useState([]);
  const checkList = ["Sensors", "Marks", "Pipes", "Zones", "Pipeaccess", "Maps"];



console.log("sensors?", sensorsData[1]?.id);


 
// get sensors function
const getSensors = e => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
    headers: {
      'Authorization': 'Bearer ' +  localStorage.getItem("token")
    }
  })
  .then((res) => {
setSensorsData(res.data.data.map(sensor => sensor));
})
.catch((err) => {
console.log(err);
});
}
// sensors use effect 
useEffect(() => {
  getSensors();
}, []);




  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.21088520218619,46.806343083853875],
      zoom: 12,
    });

    setMap(map);
    
    return () => map.remove();

   
  
  }, []);

  
  useEffect(() => {
    
    showSensors();

  }, []); 



  const showSensors = () => {
   // Add Sensors to the map 
// sensorsData.forEach((sensor) => {
  
//   const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
//     <h3>ID: ${sensor.id}</h3>  
//     <h3>Sensor title: ${sensor.sensor_title}</h3>
   
//     <p>Sensor description: ${sensor.sensor_description}</p>
//     <p>Sensor type: ${sensor.sensor_type}</p>
//     <p>Sensor diameter range: ${sensor.sensor_diameter_range}</p>             
//     <p>Sensor indication: ${sensor.sensor_Indication}</p>

//     <button id="deleteSensor" data-sensor-id="${sensor.id}">Delete</button>
//     <button id="updateSensor" data-sensor-id="${sensor.id}">Update</button>
//     <button id="viewSensor" data-sensor-id="${sensor.id}">View</button>
//   `);
//   const marker = new mapboxgl.Marker()
//     .setLngLat(sensor.sensor_coordinates)
//     .setPopup(popup)
//     .addTo(map);
 
//   // Delete Sensor
//   const deleteButton = marker._popup._content.querySelector('#deleteSensor');
//   deleteButton.addEventListener('click', () => {
//     const sensorId = deleteButton.getAttribute('data-sensor-id');
//     // Send DELETE request to API endpoint using Sensor id

//     const confirmation = window.confirm('Are you sure you want to delete this sensor?');

//   if (!confirmation) {
//     return;
//   }
//     axios.delete(`${process.env.REACT_APP_API_URL}/api/sensors/${sensorId}/`, {
//       headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       }
//     })
//     .then(response => {
//       // console.log('Sensor deleted', response.data);
//       // Remove the Sensor from the map
//       marker.remove();
//     })
//     .catch(error => {
//       console.error('Error deleting Sensor', error);
//     });
//   });
//   // Update Sensor
//   const updateButton = marker._popup._content.querySelector('#updateSensor');
//   updateButton.addEventListener('click', () => {
//     // code to open update popup
//     setSelectedSensor(sensor);
//     setOpenUpdateSensorPopup(true);
//     // console.log('Update button clicked');
//   });
//   // View Sensor
  
//   const ViewButton = marker._popup._content.querySelector('#viewSensor');
//   ViewButton.addEventListener('click', () => {
//     setSelectedSensor(sensor);
//     setOpenViewSensorPopup(true);
//   });
// });

// Add pipe to the map
sensorsData.forEach((sensor) => {
  const coordinates = sensor.sensor_coordinates;
  // create a GeoJSON feature with the sensor coordinates
  const sensorFeature = {
  type: 'Feature',
  geometry: {
  type: 'circle',
  coordinates: coordinates,
  },
  properties: {},
  };
  // add the sensor feature to the map
  map.addSource('sensor-' + sensor.id, {
  type: 'geojson',
  data: sensorFeature,
  });
  map.addLayer({
  id: 'sensor-' + sensor.id,
  type: 'circle',
  source: 'sensor-' + sensor.id,
  layout: {
  'line-join': 'round',
  'line-cap': 'round',
  },
  paint: {
  'line-color': '#3284ff',
  'line-width': 10,
  },
  });
  map.on('click', 'sensor-' + sensor.id, (e) => {
    console.log("hellllooooo")
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h3>sensor title: ${sensor.sensor_title}</h3> 
  <h3>ID : ${sensor.id}</h3> 
  <p>sensor description: ${sensor.sensor_description}</p> 
  <p>sensor type: ${sensor.sensor_type}</p> 
  
  <p>sensor status: ${sensor.sensor_status}</p> 
  <p>sensor length: ${sensor.sensor_length}</p> 
  <button id="deletesensor" data-sensor-id="${sensor.id}">Delete</button> 
  <button id="updatesensor" data-sensor-id="${sensor.id}">Update</button> 
  <button id="viewsensor" data-sensor-id="${sensor.id}">View Details</button>` ;
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setDOMContent(popupContent)
  .addTo(map);
  localStorage.setItem("selectedsensorId",sensor.id);

  //delete sensor
  const deleteButton = document.getElementById('deletesensor');
  deleteButton.addEventListener('click', () => {
    const sensorId = deleteButton.getAttribute('data-sensor-id');
    // Send DELETE request to API endpoint using sensor id
    const confirmation = window.confirm('Are you sure you want to delete this sensor?');

  if (!confirmation) {
    return;
  }
    axios.delete(`${process.env.REACT_APP_API_URL}/api/sensors/${sensorId}/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      // console.log('sensor deleted', response.data);
      // Remove the sensor from the map
      map.removeLayer('sensor-' + sensor.id);
      map.removeSource('sensor-' + sensor.id);
    })
    .catch(error => {
      console.error('Error deleting sensor', error);
    });
  });
  
  // Set up event listener for update button
  const updateButton = document.getElementById('updatesensor');
  updateButton.addEventListener('click', () => {
    // code to open update popup
    setSelectedSensor(sensor);
    setOpenUpdateSensorPopup(true);
    // console.log('Update button clicked');
  });
  
  // Set up event listener for view button
  const viewButton = document.getElementById('viewsensor');
  viewButton.addEventListener('click', () => {     
    setSelectedSensor(sensor);
    setOpenViewSensorPopup(true);
  });      
});
});
  };


  // const addSensor = () => {
  //   const newMarker = new mapboxgl.Marker()
  //     .setLngLat(map.getCenter())
  //     .addTo(map);

  //   // setMarker(newMarker);
  // };

  // const addSensors = () => {
  
  //   sensorsData.forEach((sensor) => {
  //     const newMarker = new mapboxgl.Marker()
  //       .setLngLat(sensor.sensor_coordinates)
  //       .addTo(map);
  
  //     newMarker.getElement().addEventListener("click", () => {
  //       new mapboxgl.Popup()
  //         .setLngLat(sensor.sensor_coordinates)
  //         .setHTML("<p>Hello, this is a popup!</p>")
  //         .addTo(map);
  //     });
  //   });
  // };
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
  ? checked.reduce((total, item) => {
      return total + ", " + item;
    })
  : "";

  var isChecked = (item) =>
  checked.includes(item) ? "checked-item" : "not-checked-item";

console.log("checkedItems?", checkedItems.includes("Sensors"))
if(checkedItems.includes("Sensors")){
  showSensors();
}
  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
      {/* <button onClick={addSensors}>Show Sensors</button> */}
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {`Items checked are: ${checkedItems}`}

      hello  {sensorsData.id}
      </div>
    </div>
  );
};

export default Test;