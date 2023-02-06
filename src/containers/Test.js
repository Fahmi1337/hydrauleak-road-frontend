import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const token = 'pk.eyJ1IjoiZmFobWloOTYiLCJhIjoiY2t1cXRkNWt2MGtxNjJucXZlN2FxemNpZiJ9.zBOiFS6ym4zFF9ZQ7zcmXA';

const SearchableMap = () => {
  const [viewport, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
    transitionDuration: 100,
  });
  const [searchResultLayer, setSearchResult] = useState(null);
  const mapRef = useRef();
  const handleOnResult = (event) => {
    console.log(event.result);
    setSearchResult(
      new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      })
    );
  };
  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    console.log("Updating");
    return setViewPort({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };
  useEffect(() => {
    console.log({ viewport });
  }, [viewport]);
  return (
    <div>
      <h1>Use the search bar to find a location on the map</h1>
      <Map
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="70vh"
        onViewportChange={setViewPort}
        mapboxAccessToken={token}
      >
        <MapboxGeocoder
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxAccessToken={token}
          position="top-left"
        />
      </Map>
      <DeckGL {...viewport} layers={[searchResultLayer]} />
    </div>
  );
};
export default SearchableMap;