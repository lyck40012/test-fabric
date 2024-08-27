import React, {useContext, useEffect, useState} from 'react';
import {CanvasContext} from "@/pages/TableList";
import style from "./index.less"
import {ColorPicker, InputNumber, Slider} from "antd";

const AttributePosition = () => {
  const {canvas,activeType} = useContext(CanvasContext);
  const [baseAttr,setBaseAttr] = useState({
    opacity: 0,
    angle: 0,
    left: 0,
    top: 0,
    stroke:'',
    strokeWidth:0,
    fill:''
  });
  const baseType = [
    'text',
    'i-text',
    'textbox',
    'rect',
    'circle',
  ];
  const getObjectAttr = (e?:any)=>{
    let activeObject = canvas.getActiveObject()
    if (e && e.target && e.target !== activeObject) return;
    if (activeObject && baseType.includes(activeObject.type)) {
      setBaseAttr({
        ...baseAttr,
        opacity:activeObject.get('opacity') * 100,
        left:activeObject.get('left').toFixed(2),
        top:activeObject.get('top').toFixed(2),
        angle : activeObject.get('angle') || 0,
        // stroke : activeObject.get('stroke') || '',
        // strokeWidth : activeObject.get('strokeWidth') || 0,
        // fill : activeObject.get('fill'),
      })
    }
  }
  useEffect(()=>{
    if(canvas){
      canvas.on('object:modified', getObjectAttr)
      canvas.on('selection:updated', getObjectAttr)
      getObjectAttr()
    }
    return ()=>{
      canvas?.off('object:modified', getObjectAttr)
      canvas.off('selection:updated', getObjectAttr)
    }
  },[canvas])
  const changeCommon = (key:string,value:any)=>{
    let activeObject = canvas.getActiveObject()
    if(activeObject){
      if(key==="angle"){
        activeObject.rotate(value);
        canvas.renderAll()
        setBaseAttr({...baseAttr,angle: value})
        return
      }
      activeObject.set(key,value)
      setBaseAttr({...baseAttr,[key]: value})
      canvas.renderAll()
    }
  }
  return (
    <div className={style.attributePosition}>
      <div className={style.attributePosition_rotate}>
        <span>旋转</span>
        <Slider value={baseAttr.angle} max={360} onChange={(val)=>changeCommon('angle',val)}/>
      </div>
      <div>
        <p>位置信息</p>
        <InputNumber prefix='X轴' variant="filled" value={baseAttr.left}
                     onChange={(val:number)=>changeCommon('left',val)}/>
        <InputNumber prefix='Y轴' variant="filled" value={baseAttr.top}
                     onChange={(val:number)=>changeCommon('top',val)}/>
      </div>
{/*       <div>
         <span>边框颜色</span>
         <ColorPicker value={baseAttr.stroke} onChange={(str:string)=>changeCommon('stroke',str?.toHexString())}  />
         <InputNumber prefix='边框宽度' variant="filled" value={baseAttr.strokeWidth}
                      onChange={(val:number)=>changeCommon('strokeWidth',val)}/>
       </div>
      <div>
        <span>填充颜色</span>
        <ColorPicker  value={baseAttr.fill} onChange={(str:string)=>changeCommon('fill',str?.toHexString())}  />
      </div>*/}
    </div>
  );
};

export default AttributePosition;
