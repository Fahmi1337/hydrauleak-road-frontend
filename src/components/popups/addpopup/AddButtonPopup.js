import React, { useState } from "react";
import "./AddButtonPopup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSignalStream, faDrawPolygon, faPipeSection, faPipeValve, faLocationXmark, faMapPin } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import RightAddSensorPopup from '../addsensorpopup/RightAddSensorPopup';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '21%',
  left: '14%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '21%',
  left: '14%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

    const AddButtonPopup = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    
    const [isRightPopupOpen, setIsRightPopupOpen] = useState(false);


//POPUP1
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
//POPUP1



//POPUP2
const [open2, setOpen2] = React.useState(false);
const handleOpen2 = () => setOpen2(true);
const handleClose2 = () => setOpen2(false);
//POPUP2

const [addSensorPop, setAddSensorPop] = useState(false)




    const handleRightPopupOpen = () => {
      setIsRightPopupOpen(true);
     
    };
  
    const handleRightPopupClose = () => {
      setIsRightPopupOpen(false);
    };

    const togglePopup = () => {
      setShowPopup(!showPopup);

      
    }



   
      const handleClickSensor = () => {
        props.handleClickSensor(props.data);
      };

   



    const {setRunEffect} = props;
    return (
        <div>
        {/* <button onClick={togglePopup}>
          Click Here
        </button>
        {showPopup ? 
        <div className='addPopup' style={{height: 400, width: 600}}>
          <div className='icons'>
         
          <button  onClick={() => {setRunEffect(true); togglePopup();}} >Add pipe</button>
          <button onClick={() => { setRunEffect(true); togglePopup();}} >Add pipe Access </button>
          <button onClick={() => { setRunEffect(true); togglePopup();handleRightPopupOpen();}} >Add Sensor</button>
          
          <button onClick={() => { setRunEffect(true); togglePopup();}} >Add mark</button>
          <button onClick={() => { setRunEffect(true); togglePopup();}} >Add zone</button>
          <button onClick={() => { setRunEffect(true); handleRightPopupOpen();}}>Add Map</button>
{isRightPopupOpen ? <RightAddSensorPopup onClose={handleRightPopupClose} /> : null}
          


          </div>
          
        </div>
        : null } */}
        <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        disableEnforceFocus
        hideBackdrop
        style={{ position: 'initial' }}
       
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <div>
            {/* MODAL 2 */}
            <button  onClick={() => {setRunEffect(true); }} >Add pipe</button>
          <button onClick={() => { setRunEffect(true); }} >Add pipe Access </button>
          <button onClick={() => { setRunEffect(true); handleOpen2(); handleClose();}} >Add Sensor</button>
          
          <button >Add mark</button>
          <button onClick={() => { setRunEffect(true);}} >Add zone</button>
          <button onClick={() => { setRunEffect(true); }}>Add Map</button>
          <button onClick={() => { handleClose(); }}>Close</button>
           <button onClick={handleClickSensor}>Click Me</button>
     
         {/* MODAL 2 */}
      
          </div>
        </Box>
      </Modal>

      <Modal
      disableEnforceFocus
      hideBackdrop
      style={{ position: 'initial' }}
      
        open={open2}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
        
          <div>
          <RightAddSensorPopup handleClose2={handleClose2} handleClose={handleClose} getSensors={props.getSensors}/>
        
          </div>
        </Box>
      </Modal>
      </div>
  );
}


AddButtonPopup.propTypes = {
  setRunEffect: PropTypes.func.isRequired,
};

export default AddButtonPopup