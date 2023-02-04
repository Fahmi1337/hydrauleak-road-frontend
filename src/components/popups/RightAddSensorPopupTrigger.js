import React, { useState } from 'react';

import RightAddSensorPopup from './RightAddSensorPopup';

const PopupTrigger = (props) => {
  
  const [isRightPopupOpen, setIsRightPopupOpen] = useState(false);



  const handleRightPopupOpen = () => {
    setIsRightPopupOpen(true);
  };



  const handleRightPopupClose = () => {
    setIsRightPopupOpen(false);
  };

  const funcList = [props.onClick(),handleRightPopupOpen() ]

  return (
    <div>
          
      <button onClick={()=>funcList.forEach(func => func()) }>Open Right Popup</button>
      
      {isRightPopupOpen ? <RightAddSensorPopup onClose={handleRightPopupClose} /> : null}
    </div>
  );
};

export default PopupTrigger;