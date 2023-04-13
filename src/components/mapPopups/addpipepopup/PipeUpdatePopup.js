import React, { useState, useEffect } from "react";
import "../../../assets/css/ContributesPopup.css"
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const PipeUpdatePopup = ({ onOpen, onCancel, pipe }) => {
  const [pipeData, setPipeData] = useState(pipe);

  const handlePipeDataChange = (e) => {
    setPipeData({
      ...pipeData,
      [e.target.name]: e.target.value,
    });
  };

  const { pipe_coordinates, pipe_description, pipe_title, pipe_diameter, pipe_length, pipe_type, pipe_material, pipe_status, map } = pipeData;

  const handleSubmitData = () => {
    if (!pipeData.pipe_title || !pipeData.pipe_description|| !pipeData.pipe_length|| !pipeData.pipe_coordinates|| !pipeData.map) {
      alert("Please fill in all required fields.");
      return;
    }

    axios.put(
      `${process.env.REACT_APP_API_URL}/api/pipes/${pipeData.id}/`,
      pipeData,
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
            <div className="contributesPopup">
              <h1>Update Pipe</h1>
              <form>
                
              <label >Map:</label>         
            <select  type="text"
                  name="map" onChange={e => handlePipeDataChange(e)} value={pipeData.map}>
                  {maps.data?.map(map => (
                  <option key={map.id} value={map.id}>{map.map_title}</option>          
                  ))} 
            </select>
        

                <label>Pipe coordinates:</label>
                <input
                  disabled
                  type="text"
                  name="pipe_coordinates"
                  value={pipeData.pipe_coordinates}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe title:</label>
                <input
                  type="text"
                  name="pipe_title"
                  value={pipeData.pipe_title}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe description:</label>
                <textarea
                  type="text"
                  name="pipe_description"
                  value={pipeData.pipe_description}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe diameter:</label>
                <input
                  type="text"
                  name="pipe_diameter"
                  value={pipeData.pipe_diameter}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe length:</label>
                <input
                  type="text"
                  name="pipe_length"
                  value={pipeData.pipe_length}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe type:</label>
                <input
                  type="text"
                  name="pipe_type"
                  value={pipeData.pipe_type}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe material:</label>
                <input
                  type="text"
                  name="pipe_material"
                  value={pipeData.pipe_material}
                  onChange={handlePipeDataChange}
                />

                <label>Pipe status:</label>
                <input
                  type="text"
                  name="pipe_status"
                  value={pipeData.pipe_status}
                  onChange={handlePipeDataChange}
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

export default PipeUpdatePopup;