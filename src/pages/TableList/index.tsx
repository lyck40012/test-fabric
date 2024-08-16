import React, {useEffect, useRef, useState} from 'react';
import {fabric} from 'fabric'
import "./index.less"
import  Tools from "./Tools";
export const CanvasContext = React.createContext({})
const MyComponent = () => {
  const [canvas, setCanvas] = useState<any>(null)
  const [activeObject,setActiveObject] = useState<any>()
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');
    setCanvas(canvas)
    // canvas.on('selection:updated',(event)=>{
    //     setActiveObject(canvas.getActiveObject())
    // })
    canvas.on('mouse:down',(event)=>{
      let activeObject = canvas.getActiveObject()
      setActiveObject(activeObject)
    // if(!activeObject){
    //   setActiveObject(null)
    // }
    })
  }, []);
  return (
    <div>
      <CanvasContext.Provider value={{canvas,activeObject}}>
          <Tools />
        <canvas id='canvas' width={1250} height={600}></canvas>
      </CanvasContext.Provider>
    </div>
  );
};

export default MyComponent;
