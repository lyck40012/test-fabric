import React, {useEffect, useRef, useState} from 'react';
import bg from "./bg.jpg"
import { fabric } from "fabric"
import {getGlobalValue} from "@/plugin/useGlobalState";

let lastRef:any ={}
let selectRect:any
let workspaceDiv:any
let rectList:any
let canvas:any
const GoodsList = () => {
  const handleDragEnd = (event)=>{

    selectRect = null
  }
  const onDragStart = (event)=>{
   canvas =  getGlobalValue('canvasExample')
    const objects = canvas.getObjects();
     workspaceDiv = objects.find((obj:any)=>obj.id==='workspace');
     rectList = objects.filter((item: fabric.Object) => (item.type === 'rect'&&item.id!=='workspace'&&!item?.customData?.id))
  }
  const handleIsDrag = (position:any)=>{
    let result  = rectList?.find((rect:fabric.Object) => {
      let positionRect = {
        left:rect?.getBoundingRect().left -workspaceDiv?.getBoundingRect().left,
        top:rect?.getBoundingRect().top - workspaceDiv?.getBoundingRect().top,
        width:rect?.getBoundingRect().width,
        height:rect?.getBoundingRect().height
      }
      let positionItem = {
        x:position?.x -workspaceDiv?.getBoundingRect()?.left,
        y:position?.y -workspaceDiv?.getBoundingRect()?.top,
      }
      if(positionRect.left<=positionItem.x&&
        positionRect.left+positionRect.width>=positionItem.x&&
        positionRect.top<=positionItem.y&&
        positionRect.top+positionRect.height>=positionItem.y){
        selectRect = rect
        return true
      }
      return false
    })
    if(result){
      selectRect.set('fill', 'red')
      selectRect.set('customData', {id:1})
      canvas.renderAll();
    }else {
       selectRect?.set('fill', '#ffffcc')
      selectRect?.set('customData', {id:''})
      selectRect = null
      canvas.renderAll();
    }
  }
  const  handleOnDrag  =(event:any)=>{
    let canvas =  getGlobalValue('canvasExample')
    if(event?.pageX!==lastRef?.pageX ||  event?.pageY!==lastRef?.pageY){
      const {left, top} = canvas.getSelectionElement().getBoundingClientRect();
      const point = {
        x: event.pageX - left,
        y: event.pageY - top,
      };
      handleIsDrag(point)
      // console.log(canvas.restorePointerVpt(point))
    }
    lastRef = {
      pageX:event.pageX,
      pageY:event.pageY
    }
    // handleIsDrag(canvas.restorePointerVpt(point))
  }

  return (
    <div>
      <img src={bg}
           style={{width:50,height:70}}
           draggable={true}
           onDrag={handleOnDrag}
           onDragEnd={handleDragEnd}
           onDragStart={onDragStart}
      />
     </div>
  );
};

export default GoodsList;
