import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useGetMaps = () => {
  const [mapsData, setMapsData] = useState([]);

  const getMaps = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/maps/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
      setMapsData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getMaps();
  }, []);

  return mapsData;
}

export const useGetPipes = () => {
  const [pipes, setPipes] = useState([]);

  const getPipes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pipes/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
      setPipes(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getPipes();
  }, []);

  return pipes;
}

export const useGetPipeAccess = () => {
  const [pipeAccess, setPipeAccess] = useState([]);

  const getPipeAccess = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pipeacces/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
      setPipeAccess(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getPipeAccess();
  }, []);

  return pipeAccess;
}

export const useGetZones = () => {
  const [zones, setZones] = useState([]);

  const getZones = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/zones/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
      setZones(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getZones();
  }, []);

  return zones;
}

export const useGetMarkers = () => {
  const [markersData, setMarkersData] = useState([]);

  const getMarkers = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/marks/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
      setMarkersData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getMarkers();
  }, []);

  return markersData;
}

export const useGetSensors = () => {
  const [sensorsData, setSensorsData] = useState([]);

  const getSensors = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        setSensorsData(res.data.data.map(sensor => sensor));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSensors();
  }, [getSensors]); 
   
  return sensorsData;
}