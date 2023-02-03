import React, { useState } from 'react';

import RightAddSensorPopup from './RightAddSensorPopup';

const PopupTrigger = () => {
  
  const [isRightPopupOpen, setIsRightPopupOpen] = useState(false);



  const handleRightPopupOpen = () => {
    setIsRightPopupOpen(true);
  };



  const handleRightPopupClose = () => {
    setIsRightPopupOpen(false);
  };

  return (
    <div>
      
      <button onClick={handleRightPopupOpen}>Open Right Popup</button>
      
      {isRightPopupOpen ? <RightAddSensorPopup onClose={handleRightPopupClose} /> : null}
    </div>
  );
};

export default PopupTrigger;