import React, { useState } from "react";
import "./addMarkPopup.css";
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const MarkUpdatePopup = ({ onOpen, onCancel, mark }) => {
  
    const [markData, setMarkData] = useState(mark);

  const handleMarkDataChange = (e) => {
    setMarkData({
      ...markData,
      [e.target.name]: e.target.value,
    });
  };

  const { mark_coordinates, mark_description, mark_title, pipe } = markData;

  const handleSubmitData = () => {
    if (!markData.mark_title || !markData.mark_coordinates) {
      alert("Please fill in all required fields.");
      return;
    }


    axios.put(
      `${process.env.REACT_APP_API_URL}/api/marks/${markData.id}/`,
      markData,
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
            <div className="MarkPopup">
              <h3>Update Mark</h3>
              <form>

              <label>Pipe:</label>
        <input
        disabled
          type="text"
          name="pipe"
          value={markData.pipe}
          onChange={handleMarkDataChange}
        />

                <label>Mark coordinates:</label>
                <input
                  disabled
                  type="text"
                  name="mark_coordinates"
                  value={markData.mark_coordinates}
                  onChange={handleMarkDataChange}
                />

                <label>Mark title:</label>
                <input
                  type="text"
                  name="mark_title"
                  value={markData.mark_title}
                  onChange={handleMarkDataChange}
                />

                <label>Mark description:</label>
                <textarea
                  type="text"
                  name="mark_description"
                  value={markData.mark_description}
                  onChange={handleMarkDataChange}
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

export default MarkUpdatePopup;
