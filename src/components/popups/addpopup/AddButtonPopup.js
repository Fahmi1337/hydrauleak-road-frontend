import React, { useState } from "react";
import "./AddButtonPopup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSignalStream, faDrawPolygon, faPipeSection, faPipeValve, faLocationXmark, faMapPin } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import RightAddSensorPopup from '../addsensorpopup/RightAddSensorPopup';

import AddMarkPopup from '../addmarkpopup/AddMarkPopup'

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
  bgcolor: 'rgba(255, 255, 255, 0.75)',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '48%',
  left: '17%',
  transform: 'translate(-50%, -50%)',
  width: '34%',
 height: '80%',
  bgcolor: 'rgba(255, 255, 255, 0.75)',
  boxShadow: 24,
  overflowY: 'scroll',
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



// Add Sensor
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
    const {setRunEffectPipe} = props;
    const {setRunEffectZone} = props;




//Add Mark
const [showMarkModal, setShowMarkModal] = useState(false);

const handleCloseMarkModal = () => setShowMarkModal(false);
const handleShowMarkModal = () => setShowMarkModal(true);




    return (
        <>
      
        <Button onClick={handleOpen}>Contributes</Button>
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
          <button  onClick={() => {setRunEffectPipe(true);  handleClose();}} >Add pipe</button>
          <button onClick={() => { setRunEffect(true);  handleClose();}} >Add pipe Access </button>
          <button onClick={() => { setRunEffect(true); handleOpen2(); handleClose();}} >Add Sensor</button>
          
          <button onClick={() => {handleShowMarkModal();   handleClose();}} >Add mark</button>

          <AddMarkPopup />

          <button onClick={() => { setRunEffectZone(true); handleClose();}} >Add zone</button>
          <button onClick={() => { setRunEffect(true);  handleClose();}}>Add Map</button>
          <button onClick={() => { handleClose(); }}>Close</button>
           <button onClick={handleClickSensor}>Click Me</button>
       
       

       
         {/*MARK  MODAL*/}
       
       
       <AddMarkPopup  />
       
       
       
       
       
       
       
       
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
















      </>
  );
}


AddButtonPopup.propTypes = {
  setRunEffect: PropTypes.func.isRequired,
};

export default AddButtonPopup