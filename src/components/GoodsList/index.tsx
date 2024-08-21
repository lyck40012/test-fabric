import React from 'react';
import bg from "./bg.jpg"
import {getGlobalValue} from "@/plugin/useGlobalState";
const GoodsList = () => {
  const handleDragEnd = (event)=>{
    let canvas = getGlobalValue('canvasExample')

  }
  return (
    <div>
      <img src={bg} style={{width:50,height:70}} draggable={true} onDragEnd={handleDragEnd} />
     </div>
  );
};

export default GoodsList;
