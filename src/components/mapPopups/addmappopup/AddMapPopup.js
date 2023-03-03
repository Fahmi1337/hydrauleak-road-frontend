import React, { useState, useEffect } from "react";
import "./addMapPopup.css"
import axios from 'axios';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const AddMapPopup = (props) => {

const [addMap, setAddMap] = useState(false);

const [selectedContract, setSelectedContract] = useState({})
  const initialState = '';
  const [lat, setLat] = useState(initialState);
  const [lng, setLng] = useState(initialState);


  function getLatLng() {
    const lat = localStorage.getItem("newSensorLat");
    const lng = localStorage.getItem("newSensorLng");
   
    
      setLat(lat);
      setLng(lng);
    setMapData({...mapData, map_coordinate : [lng, lat]});
  }
 

  const reloadPage = () => {
    if(selectedContract.id){
      props.handleCancelAddMapContract();
    }
   else{
    props.handleCloseMap();
   }
 
    localStorage.removeItem("newSensorLng");
    localStorage.removeItem("newSensorLat");
  };

  useEffect(() => {
    getLatLng();
  }, []);
  window.addEventListener("storage", () => {
    getLatLng();
  });
  useEffect(() => {
    if (lat !== initialState) {
      localStorage.setItem("newSensorLat", lat);
    }
  }, [lng, lat]);



  const [mapData, setMapData] = useState({
    map_title:'',
    map_description: '',
    contract: 1,
  });



  const handleMapDataChange = (e) => {
    setMapData({
      ...mapData,
      [e.target.name]: e.target.value,
      
    });
  };
  const { map_title, map_description, map_creation_date, map_coordinate, contract } = mapData;
  const handleSubmitData = () => {

    if (!mapData.map_title || !mapData.map_description || !mapData.map_coordinate ) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      map_coordinate, map_creation_date, map_description, map_title, contract: parseInt(contract)
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/maps/`, data,
      
      {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +   localStorage.getItem("token")
  }}
  
  )    
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    
      // reloadPage();
  };

    // //Modal

    const OpenMap = props.openMap; 
console.log("mapdata?", mapData);

    const [contracts, setContracts] = useState([]);

    const getContracts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/contracts/`,
          {
            method: "GET",
    
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((response) => response.json())
          .then((data) => setContracts(data));
    return response;
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {   
      getContracts();  
          }, []);

          useEffect(() => {   
            getContracts();
              if (props.selectedContract){
                setSelectedContract(props.selectedContract) ;
              } 
                }, []);   
console.log("props.selectedContract", selectedContract)
  return (
    <>
 
    <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={OpenMap}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        
        <div className="MapPopup">
          <h3>Add Map</h3>
        <form>
        <label>
                Contract:
                </label>
                <select  
                disabled={selectedContract.id > 0 ? true : false}
                value={selectedContract.id > 0 ? selectedContract.id : mapData.contract}
                  name="contract" onChange={handleMapDataChange} > <option disabled selected value> -- select an option -- </option>
                  {contracts?.map(contract => (
                    
                  <option key={contract.id} value={contract.id}>{contract.contract_title}</option>          
                  ))} 
            </select>
        <label>Map title:</label>
          <input
            type="text"
            name="map_title"
            value={mapData.map_title}
            onChange={e => handleMapDataChange(e)}
          />

          <label>Map description:</label>
            <textarea type="text"
            name="map_description" value={mapData.map_description} onChange={e => handleMapDataChange(e)} />
          

          <label>Map coordinates:</label>
          <input
          disabled
            type="text"
            name="map_coordinate"
            value={mapData.map_coordinate}
            onChange={e => handleMapDataChange(e)}
          />
          <label>Map creation date:</label>
          <input
            type="datetime-local"
            name="map_creation_date"
            value={mapData.map_creation_date}
            onChange={e => handleMapDataChange(e)}
          />
        </form>
        
        <button onClick={()=>{handleSubmitData();}}>Submit</button>
        <button onClick={()=>{reloadPage();}}>Cancel</button>
      </div>
        </Box>
      </Modal>


  </>
  )
}

export default AddMapPopup