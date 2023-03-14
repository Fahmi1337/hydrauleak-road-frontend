import React from 'react';

const MarkerFilter = ({ markers, setMarkers }) => {
  const handleCheckboxChange = event => {
    const checked = event.target.checked;
    const value = event.target.value;

    const newMarkers = markers.map(marker =>
      marker.type === value ? { ...marker, visible: checked } : marker
    );

    setMarkers(newMarkers);
  };

  const types = Array.from(new Set(markers.map(marker => marker.type)));

  return (
    <div>
      {types.map(type => (
        <div key={type}>
          <label>
            <input
              type="checkbox"
              value={type}
              checked={markers.some(marker => marker.type === type && marker.visible)}
              onChange={handleCheckboxChange}
            />
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MarkerFilter;