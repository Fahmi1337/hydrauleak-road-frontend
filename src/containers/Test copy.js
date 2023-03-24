
  
  useEffect(() => {
 
      
    
   
     

  




// Add Zones to the map
zones.forEach(zone => {
  map.addSource(zone.id.toString(), {
  type: 'geojson',
  data: {
  type: 'Feature',
  geometry: {
  type: 'Polygon',
  coordinates: [zone.zone_coordinates]
  }
  }
  });
  
  map.addLayer({
  id: zone.id.toString(),
  type: 'fill',
  source: zone.id.toString(),
  layout: {},
  paint: {
  'fill-color': zone.zone_color,
  'fill-opacity': 0.5
  }
  });
  
  map.addLayer({
  id: zone.id.toString() + 'outline',
  type: 'line',
  source: zone.id.toString(),
  layout: {},
  paint: {
  'line-color': "black",
  'line-width': 3
  }
  });
  
  // Add a popup to the zone that fetches the id and the coordinates
  map.on('click', zone.id.toString(), (e) => {
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h3>Title : ${zone.zone_title}</h3> 
  <h3>ID : ${zone.id}</h3> 
  <P>Color : ${zone.zone_color}</P> 
  <p>Map : ${zone.map}</p> 
  <button id="deleteZone" data-zone-id="${zone.id}">Delete</button> 
  <button id="updateZone">Update</button> <button id="viewZone">View</button>` ;
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setDOMContent(popupContent)
  .addTo(map);
// delete Zone
const deleteButton = popupContent.querySelector('#deleteZone');
deleteButton.addEventListener('click', () => {
  const zoneId = deleteButton.getAttribute('data-zone-id');
  // Send DELETE request to API endpoint using Zone id
  const confirmation = window.confirm('Are you sure you want to delete this zone?');

  if (!confirmation) {
    return;
  }
  axios.delete(`${process.env.REACT_APP_API_URL}/api/zones/${zoneId}/`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then(response => {
    // console.log('Zone deleted', response.data);
    // Remove the Zone from the map
    map.removeLayer(zoneId.toString()); // Remove the fill layer
    map.removeLayer(zoneId.toString() + 'outline'); // Remove the outline layer
    map.removeSource(zoneId.toString()); // Remove the source
  })
  .catch(error => {
    console.error('Error deleting Zone', error);
  });
});

const updateButton = popupContent.querySelector('#updateZone');
updateButton.addEventListener('click', () => {
  // code to open update popup
  setSelectedZone(zone);
  setOpenUpdateZonePopup(true);
  // console.log('Update button clicked');
});

const viewButton = popupContent.querySelector('#viewZone');
viewButton.addEventListener('click', () => {
  setSelectedZone(zone);
  setOpenViewZonePopup(true);
});
});



  });


  map.on('click', function (e) {
    map.dragPan.disable();
    map.dragPan.enable();
  });

  map.on('dragend', function (e) {
    const coordinates = e.target.getBounds().getCenter().toArray();
    setZoneCoordinates(coordinates);
    
  });


  const draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
   
    controls: {
        polygon: runEffectZone,
        trash: runEffectZone
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    // defaultMode: 'draw_polygon'
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
    const data = draw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
     
        const area = turf.area(data);
        
 
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100000;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;

        setZoneCoordinates(data.features[0].geometry.coordinates[0])
        window.localStorage.setItem("zoneArea", rounded_area.toLocaleString());
        window.dispatchEvent(new Event("zoneAreaStorage"));
    } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
            alert('Click the map to draw a polygon.');
    }
   
}

 console.log("runEffectZone2",runEffectZone)


});




  if (runEffectPipe){
  

 

  const geojson = {
    'type': 'FeatureCollection',
    'features': []
    };
     
    // Used to draw a line between points
    const linestring = {
    'type': 'Feature',
    'geometry': {
    'type': 'LineString',
    'coordinates': []
    }
    };
    map.on('load', () => {
    map.addSource('geojson', {
      'type': 'geojson',
      'data': geojson
      });
       
      // Add styles to the map
      map.addLayer({
      id: 'measure-points',
      type: 'circle',
      source: 'geojson',
      paint: {
      'circle-radius': 5,
      'circle-color': 'blue'
      },
      filter: ['in', '$type', 'Point']
      });
      map.addLayer({
      id: 'measure-lines',
      type: 'line',
      source: 'geojson',
      layout: {
      'line-cap': 'round',
      'line-join': 'round'
      },
      paint: {
      'line-color': 'blue',
      'line-width': 2.5
      },
      filter: ['in', '$type', 'LineString']
      });
      window.localStorage.removeItem("newCoordinates");
      map.on('click', (e) => {
          
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points']
      });
       
      // Remove the linestring from the group
      // so we can redraw it based on the points collection.
      if (geojson.features.length > 1) geojson.features.pop();
       
      // Clear the distance container to populate it with a new value.
   
       
      // If a feature was clicked, remove it from the map.
      if (features.length) {
      const id = features[0].properties.id;
      geojson.features = geojson.features.filter(
      (point) => point.properties.id !== id
      );
      } else {
      const point = {
      'type': 'Feature',
      'geometry': {
      'type': 'Point',
      'coordinates': [e.lngLat.lng, e.lngLat.lat]
      },
      'properties': {
      'id': String(new Date().getTime())
      }
      };
       
      geojson.features.push(point);
      }
       
      if (geojson.features.length > 0) {
      linestring.geometry.coordinates = geojson.features.map(
      (point) => point.geometry.coordinates
      );
       
      geojson.features.push(linestring);
       
      // Populate the distanceContainer with total distance
      const value = document.createElement('pre');
      const distance = turf.length(linestring);
      value.textContent = `Total distance: ${distance.toLocaleString()}km`;
      // console.log("values :", value )
      // distanceContainer.appendChild(value);
      window.localStorage.setItem("pipeLength", distance.toLocaleString());
      
      window.dispatchEvent(new Event("pipeLengthStorage"));
      }
       
      map.getSource('geojson').setData(geojson);


      coordinatesPipe.push([e.lngLat.lng, e.lngLat.lat]);
      
    
      window.localStorage.setItem("newCoordinates", JSON.stringify(linestring.geometry.coordinates));
      
      window.dispatchEvent(new Event("storage"));
      });
    });
      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
        });
        // Change the cursor to a pointer when hovering over a point on the map.
        // Otherwise cursor is a crosshair.
        map.getCanvas().style.cursor = features.length
        ? 'pointer'
        : 'crosshair';
        });

  }



//runEffectSensor
if (runEffectSensor) {
  map.on("click", handleClick);

return () => {
  map.off("click", handleClick);
};

}


// Navigation Control
map.addControl(new mapboxgl.NavigationControl({
  style: 'compact',
  zoom: map.getZoom(),
  bearing: map.getBearing(),
  pitch: map.getPitch(),
}),'bottom-right');


//Map search Geocoder
map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  
  placeholder: 'Search for location',
      marker: false,
      position: 'top-right',
}),'top-left');






 //UPDATE CENTER ONCLICK

  map.on("click", handleClickCenter);

return () => {
  map.off("click", handleClickCenter);
};






}
, [ pipesData, pipesAccessData, zones, mapsData, searchCoordinates, coordinatesPipe, runEffectPipe, runEffectZone, runEffectSensor, mapCenter]);
