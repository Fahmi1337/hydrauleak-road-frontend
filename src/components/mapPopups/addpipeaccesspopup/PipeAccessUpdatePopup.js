import React, { useState } from "react";
import "../../../assets/css/ContributesPopup.css"
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const PipeAccessUpdatePopup = ({ onOpen, onCancel, pipeAccess }) => {

  const [pipeAccessData, setPipeAccessData] = useState(pipeAccess);

  const handlePipeAccessDataChange = (e) => {
    setPipeAccessData({
      ...pipeAccessData,
      [e.target.name]: e.target.value,
    });
  };

  const { pipe_access_coordinates, pipe_access_description, pipe_access_title, pipe_access_type, pipe } = pipeAccessData;

  const handleSubmitData = () => {
    if (!pipeAccessData.pipe_access_title || !pipeAccessData.pipe_access_coordinates || !pipeAccessData.pipe) {
      alert("Please fill in all required fields.");
      return;
    }

    axios.put(
      `${process.env.REACT_APP_API_URL}/api/pipeacces/${pipeAccessData.id}/`,
      pipeAccessData,
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
              <h3>Update Pipe Access</h3>
              <form>
              <label>Pipe:</label>
                <input
                disabled
                    type="text"
                    name="pipe"
                    value={pipeAccessData.pipe}
                    onChange={handlePipeAccessDataChange}
                />

                <label>Coordinates:</label>
                <input
                  type="text"
                  name="pipe_access_coordinates"
                  value={pipe_access_coordinates}
                  onChange={handlePipeAccessDataChange}
                  disabled
                />

                <label>Title:</label>
                <input
                  type="text"
                  name="pipe_access_title"
                  value={pipe_access_title}
                  onChange={handlePipeAccessDataChange}
                />

                <label>Description:</label>
                <textarea
                  type="text"
                  name="pipe_access_description"
                  value={pipe_access_description}
                  onChange={handlePipeAccessDataChange}
                />

                <label>Type:</label>
                <select
                  name="pipe_access_type"
                  value={pipe_access_type}
                  onChange={handlePipeAccessDataChange}
                >
                    <option value="HouseValve">House Valve</option>
                    <option value="FirePole">Fire Pole</option>
                    <option value="FireHydrantValve">Fire Hydrant Valve</option>
                 
                </select>
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

export default PipeAccessUpdatePopup;
