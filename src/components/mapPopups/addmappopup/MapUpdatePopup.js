import React, { useState } from "react";
import "../../../assets/css/ContributesPopup.css"
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const MapUpdatePopup = ({ onOpen, onCancel, map }) => {

  const [mapData, setMapData] = useState(map);

  const handleMapDataChange = (e) => {
    setMapData({
      ...mapData,
      [e.target.name]: e.target.value,
    });
  };

  const { map_coordinate, map_description, map_title } = mapData;

  const handleSubmitData = () => {
    if (!mapData.map_title || !mapData.map_coordinate) {
      alert("Please fill in all required fields.");
      return;
    }

    axios.put(
      `${process.env.REACT_APP_API_URL}/api/maps/${mapData.id}/`,
      mapData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    onCancel();
  };

  return (
    <>
      <Modal
        disableEnforceFocus
        hideBackdrop
        style={{ position: 'initial' }}
        open={onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div>
            <div className="contributesPopup">
              <h1>Update Map</h1>
              <form>
                <label>Map coordinates:</label>
                <input
                  disabled
                  type="text"
                  name="map_coordinate"
                  value={mapData.map_coordinate}
                  onChange={handleMapDataChange}
                />

                <label>Map title:</label>
                <input
                  type="text"
                  name="map_title"
                  value={mapData.map_title}
                  onChange={handleMapDataChange}
                />

                <label>Map description:</label>
                <textarea
                  type="text"
                  name="map_description"
                  value={mapData.map_description}
                  onChange={handleMapDataChange}
                />
              </form>
              <div className='formButtonsContainer'>
                <button onClick={handleSubmitData}>Submit</button>
                <button onClick={onCancel}>Cancel</button>
              </div>
              
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MapUpdatePopup;
