import React, { useState, useCallback } from "react";
import { Container, Form } from "react-bootstrap";

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




    const MapLayersPopup = (props) => {


//POPUP1
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
//POPUP1

  // useCallback hook to toggle showPipes state
  const toggleShowPipes = useCallback(() => {
    props.setShowPipes(!props.showPipes);
  }, [props]);

    return (
        <>
        <Button className="layersButton" onClick={handleOpen} variant="outlined" startIcon={<ControlPointIcon  />}> Layers</Button>
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
           {/* MODAL 2 */}
          <div >
         

          
         
   
           
            <div>
      
            <Form.Check inline id="switch1" className="pl-5">
            <Form.Check.Input
              checked={props.showSensors}
              onChange={() => props.setShowSensors(!props.showSensors)}
            />
          
          </Form.Check>
          <Form.Label>Sensors</Form.Label>
     
    
     
    </div>
    <div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <Form.Check.Input
        checked={props.showMarkers}
        onChange={() => props.setShowMarkers(!props.showMarkers)}
      />
    
    </Form.Check>
    <Form.Label>Markers</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <Form.Check.Input
        checked={props.showPipeAccess}
        onChange={() => props.setShowPipeAccess(!props.showPipeAccess)}
      />
    
    </Form.Check>
    <Form.Label>Pipe Accesses</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <Form.Check.Input
        checked={props.showMaps}
        onChange={() => props.setShowMaps(!props.showMaps)}
      />
    
    </Form.Check>
    <Form.Label>Maps</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <Form.Check.Input
       ref={(el) => (props.mapContainerRef.current = el)}
        checked={props.showPipes}
        onChange={toggleShowPipes}
      />
    
    </Form.Check>
    <Form.Label>Pipes</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <Form.Check.Input
        checked={props.showZones}
        onChange={() => props.setShowZones(!props.showZones)}
      />
    
    </Form.Check>
    <Form.Label>Zones</Form.Label>



</div>
         
         {/* MODAL 2 */}
      
          </div>
          <button onClick={() => { handleClose(); }}>Close</button>
        </Box>
        
      </Modal>

      </>
  );
}




export default MapLayersPopup