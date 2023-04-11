import React, { useState } from 'react';
import axios from 'axios';
import './postReport.css';

function PostReport(props) {
  const [user, setUser] = useState(2);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [addSensorCoordinates, setAddSensorCoordinates] = useState([]);
  const [addMarkCoordinates, setAddMarkCoordinates] = useState([]);
  const [addPipeCoordinates, setAddPipeCoordinates] = useState([]);
  const [addPipeAccessCoordinates, setAddPipeAccessCoordinates] = useState([]);
  // const [image, setImage] = useState(null);


  // const [image, setImg] = useState("Image string will come here");
  // const handleChangeImg = (e) => {
  //   console.log(e.target.files[0]);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onloadend = () => {
  //     setImg(reader.result);
  //   };
  // };

  const [image, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const add_sensor_coordinates = addSensorCoordinates.split(',').map(coord => parseFloat(coord));
    const formData = new FormData();
    // formData.append('image', image);
    formData.append('subject', subject);
    formData.append('message', message);
    // formData.append('add_sensor_coordinates', JSON.stringify(add_sensor_coordinates));
    // formData.append('add_mark_coordinates', JSON.stringify(add_sensor_coordinates));
    // formData.append('add_pipe_coordinates', JSON.stringify(add_sensor_coordinates));
    // formData.append('add_pipe_access_coordinates', JSON.stringify(add_sensor_coordinates));
    formData.append('report_date', new Date().toISOString());
    const report = {
      
      subject,
      message,
      // add_sensor_coordinates: addSensorCoordinates.split(',').map(coord => parseFloat(coord)),
      // add_mark_coordinates: addMarkCoordinates.split(',').map(coord => parseFloat(coord)),
      // add_pipe_coordinates: addPipeCoordinates.split(',').map(coord => parseFloat(coord)),
      // add_pipe_access_coordinates: addPipeAccessCoordinates.split(',').map(coord => parseFloat(coord)),
      // image: formData.get('image'),
      // report_date: new Date().toISOString(),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reports/`, formData,{
        headers: {
          'Authorization': 'Bearer ' +  localStorage.getItem("token")
        }
      });
      window.location.reload();
      // console.log(response.data); // log the response data from the backend
    } catch (error) {
      console.error(error); // log any errors that occur during the request
    }
  };

  return (
   

      <div className='submitReportContainer'>
          <form onSubmit={handleSubmit}>
          <h1> Report </h1>
        <label>
          Subject:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}  required/>
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}  required/>
        </label>
        {/* <label>
          Add Sensor Coordinates:
          <input type="text" value={addSensorCoordinates} onChange={(e) => setAddSensorCoordinates(e.target.value)}  />
        </label> */}

        {/* <label>
          Add Pipe Coordinates:
          <input type="text" value={addPipeCoordinates} onChange={(e) => setAddPipeCoordinates(e.target.value)} />
        </label>
        <label>
          Add Pipe Access Coordinates:
          <input type="text" value={addPipeAccessCoordinates} onChange={(e) => setAddPipeAccessCoordinates(e.target.value)} />
        </label>*/}


        <label> 
          Image:
          <input onChange={handleFileSelect} type="file" name="image" />
        </label>

        {/* <label>
          Add Mark Coordinates:
          <button >Add Mark Coordinates</button>
        </label> */}

        {/* {URL.createObjectURL(image) && ( <img src={URL.createObjectURL(image)} alt="report" />)} */}
      <div className='reportButton'>
        <button className='reportSubmitButton' type="submit">Submit Report</button>
        <button className='reportCancelButton'  onClick={props.handleCloseSubmitReport} >Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default PostReport;
