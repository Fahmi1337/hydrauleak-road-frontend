import React, { useState, useEffect } from "react";
import "./addZonePopup.css";
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const UpdateZonePopup = ({ onOpen, onCancel, zone }) => {
  const [zoneData, setZoneData] = useState(zone);

  const handleZoneDataChange = (e) => {
    setZoneData({
      ...zoneData,
      [e.target.name]: e.target.value,
    });
  };

  const { zone_title, zone_description, zone_num, zone_date, zone_status, zone_color, map, AreaZone, zone_coordinates } = zoneData;

  const handleSubmitData = () => {
    if (!zoneData.zone_title || !zoneData.zone_description || !zoneData.zone_coordinates) {
      alert("Please fill in all required fields.");
      return;
    }

    axios.put(
      `${process.env.REACT_APP_API_URL}/api/zones/${zoneData.id}/`,
      zoneData,
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


  const [maps, setMaps] = useState([]);

const getMaps = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/maps/`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setMaps(data));
return response;
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {   
  getMaps();  
      }, []);


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
            <div className="ZonePopup">
              <h3>Update Zone</h3>
              <form>
                
              <label >Map:</label>        
             
             <select  type="text"  
                   name="map" onChange={e => handleZoneDataChange(e)} value={zoneData.map || 1} > <option disabled selected value> -- select an option -- </option>
                   {maps.data?.map(map => (
                     
                   <option key={map.id} value={map.id}>{map.map_title}</option>          
                   ))} 
             </select>

              <label>Zone coordinates:</label>
                <input
                  type="text"
                  name="zone_coordinates"
                  value={JSON.stringify(zoneData.zone_coordinates)}
                  onChange={handleZoneDataChange}
                  disabled
                />


                <label>Zone title:</label>
                <input
                  type="text"
                  name="zone_title"
                  value={zoneData.zone_title}
                  onChange={handleZoneDataChange}
                />

                <label>Zone description:</label>
                <textarea
                  type="text"
                  name="zone_description"
                  value={zoneData.zone_description}
                  onChange={handleZoneDataChange}
                />

                
              </form>
              <button onClick={handleSubmitData}>Submit</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateZonePopup;
