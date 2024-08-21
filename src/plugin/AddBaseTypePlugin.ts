import { fabric } from 'fabric';
import {getGlobalValue} from "@/plugin/useGlobalState";
import { handleCenter } from "@/plugin/CenterAlignPlugin";
import { v4 as uuid } from 'uuid';
interface optionsProps {
  event: any;
  center:boolean;
}
export  const handleDragPosition = (item: fabric.Object,event)=>{
  let canvas = getGlobalValue('canvasExample')
  const { left, top } = canvas.getSelectionElement().getBoundingClientRect();
  if (event.x < left || event.y < top || item.width === undefined) return;
  const point = {
    x: event.pageX - left,
    y: event.pageY - top,
  };
  return canvas.restorePointerVpt(point)
}

const handleDrop = (position:any)=>{
  let canvas = getGlobalValue('canvasExample')
  const objects = canvas.getObjects();
   let rectList = objects.filter((item:fabric.Object)=>item.type==='rect')
 let result =  rectList.find((object:any) => {
   let nowRect = object.getBoundingRect()
   return nowRect.left<=position.x
     &&(nowRect.left +nowRect.width)>=position.x
     &&nowRect.top<=position.y
      &&(nowRect.top+nowRect.height)>=position.y
  })
  if(result)result.set('fill','red')
  console.log("position=======>",position)
  // for (const objectsKey in objects) {
  //   console.log(objectsKey)
  // }
}
export const addBaseType = (item: fabric.Object,options?: optionsProps)=>{
  let canvas = getGlobalValue('canvasExample')
  const { event = false,  center = true } = options || {};
  item.set({ id: uuid() });
  if(event){
    let pointerVpt = handleDragPosition(item, event)
    item.set({  left: pointerVpt.x, top: pointerVpt.y, });
    handleDrop(pointerVpt)
  }
  canvas.add(item);
  if (!event && center) {
    handleCenter(item);
  }
 canvas.setActiveObject(item);
  canvas.renderAll();
}

