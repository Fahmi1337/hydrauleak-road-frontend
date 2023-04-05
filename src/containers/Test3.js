import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapboxMap = () => {
  const [selectedStyle, setSelectedStyle] = useState('satellite-streets-v12');

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/${selectedStyle}`,
      center: [-2.81361, 36.77271],
      zoom: 13,
    });

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    const onClick = (style) => {
      setSelectedStyle(style);
    };

    for (const input of inputs) {
      input.onclick = () => {
        onClick(input.value);
      };
    }

    return () => {
      map.remove();
    };
  }, [selectedStyle]);

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
        <input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite-streets-v12" checked={selectedStyle === 'satellite-streets-v12'} />
        <label htmlFor="satellite-streets-v12">satellite streets</label>
        <input id="light-v11" type="radio" name="rtoggle" value="light-v11" checked={selectedStyle === 'light-v11'} />
        <label htmlFor="light-v11">light</label>
        <input id="dark-v11" type="radio" name="rtoggle" value="dark-v11" checked={selectedStyle === 'dark-v11'} />
        <label htmlFor="dark-v11">dark</label>
        <input id="streets-v12" type="radio" name="rtoggle" value="streets-v12" checked={selectedStyle === 'streets-v12'} />
        <label htmlFor="streets-v12">streets</label>
        <input id="outdoors-v12" type="radio" name="rtoggle" value="outdoors-v12" checked={selectedStyle === 'outdoors-v12'} />
        <label htmlFor="outdoors-v12">outdoors</label>
      </div>
      <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
    </>
  );
};

export default MapboxMap;
