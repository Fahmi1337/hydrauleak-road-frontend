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
import Modal from '@mui/material/Modal';


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


//POPUP1
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
//POPUP1

// Add Zone
//POPUP Zone
const [openZone, setOpenZone] = React.useState(false);
const handleOpenZone = () => setOpenZone(true);
const handleCloseZone = () => {props.HandleSetSubmitDeactivate(); setOpenZone(false);}

// Add Pipe
//POPUP Pipe
const [openPipe, setOpenPipe] = React.useState(false);
const handleOpenPipe = () => setOpenPipe(true);
const handleClosePipe = () => {props.HandleSetSubmitDeactivate(); setOpenPipe(false);}


// Add Sensor
//POPUP2
const [openSensor, setOpenSensor] = React.useState(false);
const handleOpenSensor = () => setOpenSensor(true);
const handleCloseSensor = () =>{props.HandleSetSubmitDeactivate(); setOpenSensor(false);}

// Add PipeAccess
//POPUP PipeAccess
const [openPipeAccess, setOpenPipeAccess] = React.useState(false);
const handleOpenPipeAccess = () => setOpenPipeAccess(true);
const handleClosePipeAccess = () => {props.HandleSetSubmitDeactivate();setOpenPipeAccess(false);}

// Add Mark
//POPUP Mark
const [openMark, setOpenMark] = React.useState(false);
const handleOpenMark = () => setOpenMark(true);
const handleCloseMark = () => {props.HandleSetSubmitDeactivate();setOpenMark(false);}


// Add Map
//POPUP Map
const [openMap, setOpenMap] = React.useState(false);
const handleOpenMap = () => setOpenMap(true);
const handleCloseMap = () => {props.HandleSetSubmitDeactivate();setOpenMap(false);}



    const {setSubmitActive} = props;
    const {setSubmitZoneActive} = props;
    const {setSubmitPipeActive} = props;
    const {mapClickedCoordinates} = props;





// //Add Mark
// const [showMarkModal, setShowMarkModal] = useState(false);

// const handleCloseMarkModal = () => setShowMarkModal(false);
// const handleShowMarkModal = () => setShowMarkModal(true);

const handlePolygonCreated= props.handlePolygonCreated



    return (
        <>
      {openZone && (<AddZonePopup 
      zoneCoordinates={props.zoneCoordinates}
      setSubmitZoneActive={setSubmitZoneActive} 
      handlePolygonCreated={handlePolygonCreated} 
      handleCloseZone={handleCloseZone} 
      openZone={openZone} 
      area = {props.area}/>)}
      
      {openPipe && (<AddPipePopup 
      pipeCoordinates={props.pipeCoordinates}
      setSubmitPipeActive={setSubmitPipeActive} 
      handleClosePipe={handleClosePipe} 
      openPipe={openPipe}
      pipeLength={props.pipeLength}/>)}   

      {openPipeAccess &&( <AddPipeAccessPopup  
      handleClosePipeAccess={handleClosePipeAccess} 
      openPipeAccess={openPipeAccess} 
      mapClickedCoordinates = {mapClickedCoordinates}/>)} 
     
      {openMark && (<AddMarkPopup  
      handleCloseMark={handleCloseMark} 
      openMark={openMark} 
      mapClickedCoordinates = {mapClickedCoordinates}/>)}
      
      {openMap && (<AddMapPopup  
      handleCloseMap={handleCloseMap} 
      openMap={openMap} 
      mapClickedCoordinates = {mapClickedCoordinates}/>)}
      
      {openSensor && (<RightAddSensorPopup 
      handleCloseSensor={handleCloseSensor} 
      handleClose={handleClose} 
      openSensor={openSensor} 
      mapClickedCoordinates = {mapClickedCoordinates} />)}
     
        
    <Button className="contributesButton" 
    onClick={handleOpen} 
    variant="outlined" 
    startIcon={<ControlPointIcon/>}> Contributes</Button>
      
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

          <button onClick={() => {setSubmitZoneActive(true); handleOpenZone();  handleClose();}} >Add zone</button>

          <button  onClick={() => {setSubmitPipeActive(true);handleOpenPipe();  handleClose();}} >Add pipe</button>

          <button onClick={() => {setSubmitActive(true); handleOpenPipeAccess();  handleClose();}} >Add pipe Access </button>

          <button onClick={() => { setSubmitActive(true); handleOpenSensor(); handleClose();}} >Add Sensor</button>
          
          <button onClick={() => {setSubmitActive(true); handleOpenMark();  handleClose();}} >Add mark</button>

          <button onClick={() => {setSubmitActive(true); handleOpenMap();  handleClose();}}>Add Map</button>
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
  setRunEffectSensor: PropTypes.func,
};

export default AddButtonPopup