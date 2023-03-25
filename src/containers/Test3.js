import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapboxMap = () => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-2.81361, 36.77271],
      zoom: 13,
    });

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    const onClick = (layer) => {
      const layerId = layer.target.id;
      map.setStyle('mapbox://styles/mapbox/' + layerId);
    };

    for (const input of inputs) {
      input.onclick = onClick;
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
          }
          #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
          }
          #menu {
            position: absolute;
            background: #efefef;
            padding: 10px;
            font-family: 'Open Sans', sans-serif;
          }
        `}
      </style>
      <div id="map"></div>
      <div id="menu">
        <input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite" defaultChecked />
        <label htmlFor="satellite-streets-v12">satellite streets</label>
        <input id="light-v11" type="radio" name="rtoggle" value="light" />
        <label htmlFor="light-v11">light</label>
        <input id="dark-v11" type="radio" name="rtoggle" value="dark" />
        <label htmlFor="dark-v11">dark</label>
        <input id="streets-v12" type="radio" name="rtoggle" value="streets" />
        <label htmlFor="streets-v12">streets</label>
        <input id="outdoors-v12" type="radio" name="rtoggle" value="outdoors" />
        <label htmlFor="outdoors-v12">outdoors</label>
      </div>
      <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
    </>
  );
};

export default MapboxMap;
