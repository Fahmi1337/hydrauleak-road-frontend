import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetZoneIntervention = (interventionId) => {
  
  
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/zones/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      setZones(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const interventionZones = zones.filter(zone => zone.intervention === interventionId);

  return (
    <div>
      <h2>Intervention Zones</h2>
      {interventionZones.length > 0 ? (
        <div>
          {interventionZones.map(zone => (
            <div key={zone.id}>
              <h3>{zone.zone_title}</h3>
              <p>{zone.zone_description}</p>
              <p>Zone Number: {zone.zone_num}</p>
              <p>Zone Date: {zone.zone_date}</p>
              <p>Zone Status: {zone.zone_status}</p>
              <p>Zone Color: {zone.zone_color}</p>
              <p>Zone Area: {zone.zone_area}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No zones found for this intervention.</p>
      )}
    </div>
  );
}

export default GetZoneIntervention;
