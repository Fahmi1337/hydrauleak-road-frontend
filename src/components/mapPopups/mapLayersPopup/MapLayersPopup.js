import React, { useCallback } from "react";
import {  Form } from "react-bootstrap";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import sensor from "../../../assets/icons/contributes/sensor.png";
import pipe from "../../../assets/icons/contributes/pipe.png";
import pipeAccess from "../../../assets/icons/contributes/pipeAccess.png";
import zone from "../../../assets/icons/contributes/zone.png";
import mark from "../../../assets/icons/contributes/mark.png";
import map from "../../../assets/icons/contributes/map.png";

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import VisibilityIcon from '@mui/icons-material/Visibility';
const style = {
  position: 'absolute',
  top: '35%',
  right: '10.5%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  height: "auto",
  bgcolor: 'rgba(255, 255, 255, 0.75)',
  boxShadow: 24,
  p: 4,
};




    const MapLayersPopup = (props) => {


//POPUP1
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);
//POPUP1

  // useCallback hook to toggle showPipes state
  const toggleShowPipes = useCallback(() => {
    props.setShowPipes(!props.showPipes);
    props.handleShowPipe()
  }, [props]);




    // useCallback hook to toggle showPipes state
    const toggleShowZones = useCallback(() => {
      props.setShowZones(!props.showZones);
      props.handleShowZone()
    }, [props]);
    return (
        <>
        <Button className="layersButton" onClick={handleOpen} variant="outlined" startIcon={<VisibilityIcon  />}> View Layers</Button>
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
            <img src={sensor} alt="sensor"/>
            <Form.Check.Input
              checked={props.showSensors}
              onChange={() => props.setShowSensors(!props.showSensors)}
            />
          
          </Form.Check>
          <Form.Label>Sensors</Form.Label>
          
    
     
    </div>
    <div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <img src={mark} alt="marker"/>
      <Form.Check.Input
        checked={props.showMarkers}
        onChange={() => props.setShowMarkers(!props.showMarkers)}
      />
    
    </Form.Check>
    <Form.Label>Markers</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <img src={pipeAccess} alt="pipeAccess"/>
      <Form.Check.Input
        checked={props.showPipeAccess}
        onChange={() => props.setShowPipeAccess(!props.showPipeAccess)}
      />
    
    </Form.Check>
    <Form.Label>Pipe Accesses</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <img src={map} alt="map"/>
      <Form.Check.Input
        checked={props.showMaps}
        onChange={() => props.setShowMaps(!props.showMaps)}
      />
    
    </Form.Check>
    <Form.Label>Maps</Form.Label>



</div>
<div>
      
      <Form.Check inline id="switch1" className="pl-5">
      <img src={pipe} alt="pipe"/>
      <Form.Check.Input
   
        checked={props.showPipes}
        onChange={toggleShowPipes}
      />
    
    </Form.Check>
    <Form.Label>Pipes</Form.Label>



</div>
<div>
  <Form.Check inline id="switch1" className="pl-5">
    <img src={zone} alt="zone" />
    <Form.Check.Input
      checked={props.showZones}
      onChange={toggleShowZones}
      // defaultChecked={false} // add this line
    />
  </Form.Check>
  <Form.Label>Zones</Form.Label>
</div>

         
         {/* MODAL 2 */}
      
          </div>
          {/* <button onClick={() => { handleClose(); }}>Close</button> */}
        </Box>
        
      </Modal>

      </>
  );
}




export default MapLayersPopup