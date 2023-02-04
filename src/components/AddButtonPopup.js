import React, { useState } from "react";
import "../assets/css/AddButtonPopup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSignalStream, faDrawPolygon, faPipeSection, faPipeValve, faLocationXmark, faMapPin } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import RightAddSensorPopup from './popups/RightAddSensorPopup';
import PopupTrigger from '../components/popups/RightAddSensorPopupTrigger'

    const AddButtonPopup = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    
    const [isRightPopupOpen, setIsRightPopupOpen] = useState(false);



    const handleRightPopupOpen = () => {
      setIsRightPopupOpen(true);
      togglePopup();
    };
  
    const handleRightPopupClose = () => {
      setIsRightPopupOpen(false);
    };

    const togglePopup = () => {
      setShowPopup(!showPopup);

      
    }
    const {setRunEffect} = props;
    return (
        <div>
        <button onClick={togglePopup}>
          Click Here
        </button>
        {showPopup ? 
        <div className='addPopup' style={{height: 400, width: 600}}>
          <div className='icons'>
         
          <button  onClick={() => {setRunEffect(true); togglePopup();}} >Add pipe</button>
          <button onClick={() => { setRunEffect(true); togglePopup();}} >Add pipe Access </button>
          <button onClick={() => { setRunEffect(true); togglePopup();handleRightPopupOpen();}} >Add Sensor</button>
          {/* <PopupTrigger onClick={() => {setRunEffect(true); togglePopup();}} /> */}
          <button onClick={() => { setRunEffect(true); togglePopup();}} >Add mark</button>
          <button onClick={() => { setRunEffect(true); togglePopup();}} >Add zone</button>
          <button onClick={() => { setRunEffect(true); handleRightPopupOpen();}}>Add Map</button>
{isRightPopupOpen ? <RightAddSensorPopup onClose={handleRightPopupClose} /> : null}
          


          </div>
        </div>
        : null }
      </div>
  );
}


AddButtonPopup.propTypes = {
  setRunEffect: PropTypes.func.isRequired,
};

export default AddButtonPopup