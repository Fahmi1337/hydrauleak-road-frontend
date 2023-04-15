import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetMapContract = (ContractId) => {
  

  const [maps, setMaps] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      setMaps(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const ContractMaps = maps.filter(mapOn => mapOn.contract === ContractId.contractId);


  return (
    <div>
      <h2>Contract Maps</h2>
      {ContractMaps.length > 0 ? (
        <div>
          {ContractMaps.map(map => (
            <div key={map.id}>
              <h3>ID: {map.id}</h3>
              <h3>{map.map_title}</h3>
              
              <p>Description: {map.map_description}</p>
              <p>Map Creation Date: {map.map_creation_date}</p>
              <p>Map coordinate: {map.map_coordinate}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No maps found for this Contract.</p>
      )}
    </div>
  );
}

export default GetMapContract;
