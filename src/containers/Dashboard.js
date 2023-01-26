import React, { useRef, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 import Table from './Table.js';
mapboxgl.accessToken = 'pk.eyJ1IjoiaHlkcmF1bGVhayIsImEiOiJjbGQzOWxwN3YwZzduM3ZueWloenY2bmV2In0.sb2MhxaSXUvO_EqhQWXQLA';







export default function Dashboard(){
    const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
 
useEffect(() => {
if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/mapbox/streets-v12',
center: [lng, lat],
zoom: zoom
});
});
 
useEffect(() => {
if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
setZoom(map.current.getZoom().toFixed(2));
});
});
 
return (
<div>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>

<div ref={mapContainer} className="map-container" />
{/* <Table/> */}
</div>
);
}