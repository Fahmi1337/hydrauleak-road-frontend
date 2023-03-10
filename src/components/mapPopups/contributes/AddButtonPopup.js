import React, { useState } from "react";
import "./AddButtonPopup.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSignalStream, faDrawPolygon, faPipeSection, faPipeValve, faLocationXmark, faMapPin } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import RightAddSensorPopup from '../addsensorpopup/AddSensorPopup';

import AddZonePopup from '../addzonepopup/AddZonePopup'
import AddPipePopup from '../addpipepopup/AddPipePopup'
import AddPipeAccessPopup from '../addpipeaccesspopup/AddPipeAccessPopup'
import AddMarkPopup from '../addmarkpopup/AddMarkPopup'
import AddMapPopup from '../addmappopup/AddMapPopup'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const style = {
  position: 'absolute',
  top: '32%',
  left: '22%',
  
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: "auto",
  bgcolor: 'rgba(255, 255, 255, 0.75)',
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

// Add Zone
//POPUP Zone
const [openZone, setOpenZone] = React.useState(false);
const handleOpenZone = () => setOpenZone(true);
const handleCloseZone = () => setOpenZone(false);

// Add Pipe
//POPUP Pipe
const [openPipe, setOpenPipe] = React.useState(false);
const handleOpenPipe = () => setOpenPipe(true);
const handleClosePipe = () => setOpenPipe(false);


// Add Sensor
//POPUP2
const [openSensor, setOpenSensor] = React.useState(false);
const handleOpenSensor = () => setOpenSensor(true);
const handleCloseSensor = () => setOpenSensor(false);

// Add PipeAccess
//POPUP PipeAccess
const [openPipeAccess, setOpenPipeAccess] = React.useState(false);
const handleOpenPipeAccess = () => setOpenPipeAccess(true);
const handleClosePipeAccess = () => setOpenPipeAccess(false);

// Add Mark
//POPUP Mark
const [openMark, setOpenMark] = React.useState(false);
const handleOpenMark = () => setOpenMark(true);
const handleCloseMark = () => setOpenMark(false);


// Add Map
//POPUP Map
const [openMap, setOpenMap] = React.useState(false);
const handleOpenMap = () => setOpenMap(true);
const handleCloseMap = () => setOpenMap(false);


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


    const {setRunEffectSensor} = props;
    const {setRunEffectPipe} = props;
    const {setRunEffectZone} = props;




// //Add Mark
// const [showMarkModal, setShowMarkModal] = useState(false);

// const handleCloseMarkModal = () => setShowMarkModal(false);
// const handleShowMarkModal = () => setShowMarkModal(true);

const handlePolygonCreated= props.handlePolygonCreated



    return (
        <>
      {openZone && (
   <AddZonePopup handlePolygonCreated={handlePolygonCreated} handleCloseZone={handleCloseZone} openZone={openZone} setRunEffectZone={setRunEffectZone}/>
  )}
      
{openPipe && (<AddPipePopup  handleClosePipe={handleClosePipe} openPipe={openPipe}/>)}
      
     {openPipeAccess &&( <AddPipeAccessPopup  handleClosePipeAccess={handleClosePipeAccess} openPipeAccess={openPipeAccess}/>)} 
     
      {openMark && (<AddMarkPopup  handleCloseMark={handleCloseMark} openMark={openMark}/>)}
      
      {openMap && (<AddMapPopup  handleCloseMap={handleCloseMap} openMap={openMap}/>)}
      
{openSensor && ( <RightAddSensorPopup handleCloseSensor={handleCloseSensor} handleClose={handleClose} getSensors={props.getSensors} openSensor={openSensor}/>)}
     
        
        <Button className="contributesButton" onClick={handleOpen} variant="outlined" startIcon={<ControlPointIcon  />}> Contributes</Button>
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
        
          <div className="contributesButtonsContainer">
            {/* MODAL 2 */}

          <button onClick={() => {setRunEffectZone(true); handleOpenZone();  handleClose();}} >Add zone</button>

          <button  onClick={() => {setRunEffectPipe(true); handleOpenPipe();  handleClose();}} >Add pipe</button>

          <button onClick={() => {setRunEffectSensor(true); handleOpenPipeAccess();  handleClose();}} >Add pipe Access </button>

          <button onClick={() => { setRunEffectSensor(true); handleOpenSensor(); handleClose();}} >Add Sensor</button>
          
          <button onClick={() => {setRunEffectSensor(true); handleOpenMark();  handleClose();}} >Add mark</button>

          <button onClick={() => {setRunEffectSensor(true); handleOpenMap();  handleClose();}}>Add Map</button>
          <button onClick={() => { handleClose(); }}>Close</button>
           
       
       

       
         {/*MARK  MODAL*/}
       
       
         
         {/* MODAL 2 */}
      
          </div>
        </Box>
        
      </Modal>

     
















      </>
  );
}


AddButtonPopup.propTypes = {
  setRunEffectSensor: PropTypes.func.isRequired,
};

export default AddButtonPopup