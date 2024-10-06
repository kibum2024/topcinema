import React, { useState } from 'react';

const KbSwitch = ({ swStatProp, onClick }) => {
  const [switchState, setSwitchState] = useState(swStatProp);

  const switchClick = () => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);

    // 부모에게 새로운 switch 상태 전달
    if (onClick) {
      onClick(newSwitchState);
    }
  };

  return (
    <div>
      <div 
          onClick={switchClick} 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '28px', 
            height: '18px', 
            backgroundColor: switchState? 'rgb(0, 56, 121)' : '#bbb', 
            borderRadius: '9px'
          }}
      >
        <div
            style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: !switchState? 'white' : 'rgb(0, 56, 121)', 
              borderRadius: '50%'
            }}
        >
        </div>
        <div 
            style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: switchState? 'white' : '#bbb', 
              borderRadius: '50%'
            }}
        >
        </div>
      </div>
    </div>
  );
}

export default KbSwitch;
