import React, { useState } from 'react';
import axios from 'axios';
import './postReport.css';

function PostReport() {
  const [user, setUser] = useState(2);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [addSensorCoordinates, setAddSensorCoordinates] = useState([]);
  const [addMarkCoordinates, setAddMarkCoordinates] = useState([]);
  const [addPipeCoordinates, setAddPipeCoordinates] = useState([]);
  const [addPipeAccessCoordinates, setAddPipeAccessCoordinates] = useState([]);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const report = {
      
      subject,
      message,
      add_sensor_coordinates: addSensorCoordinates.split(',').map(coord => parseFloat(coord)),
      add_mark_coordinates: addMarkCoordinates.split(',').map(coord => parseFloat(coord)),
      add_pipe_coordinates: addPipeCoordinates.split(',').map(coord => parseFloat(coord)),
      add_pipe_access_coordinates: addPipeAccessCoordinates.split(',').map(coord => parseFloat(coord)),
      
    //   image,
      report_date: new Date().toISOString(),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reports/`, report,{
        headers: {
          'Authorization': 'Bearer ' +  localStorage.getItem("token")
        }
      });

      console.log(response.data); // log the response data from the backend
    } catch (error) {
      console.error(error); // log any errors that occur during the request
    }
  };

  return (
   

        
        <form onSubmit={handleSubmit}>
        <h1> Report </h1>
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label>
        Add Sensor Coordinates:
        <input type="text" value={addSensorCoordinates} onChange={(e) => setAddSensorCoordinates(e.target.value)} />
      </label>
      <label>
        Add Mark Coordinates:
        <input type="text" value={addMarkCoordinates} onChange={(e) => setAddMarkCoordinates(e.target.value)} />
      </label>
      <label>
        Add Pipe Coordinates:
        <input type="text" value={addPipeCoordinates} onChange={(e) => setAddPipeCoordinates(e.target.value)} />
      </label>
      <label>
        Add Pipe Access Coordinates:
        <input type="text" value={addPipeAccessCoordinates} onChange={(e) => setAddPipeAccessCoordinates(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <button type="submit">Submit Report</button>
    </form>
  );
}

export default PostReport;
