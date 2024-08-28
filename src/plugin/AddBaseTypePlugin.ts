import {fabric} from 'fabric';
import {getGlobalValue} from "@/plugin/useGlobalState";
import {handleCenter} from "@/plugin/CenterAlignPlugin";
import {v4 as uuid} from 'uuid';

interface optionsProps {
  event?: any;
  center: boolean;
}
let  canvas:any
export const handleDragPosition = (item: fabric.Object, event) => {
  const {left, top} = canvas.getSelectionElement().getBoundingClientRect();
  if (event.x < left || event.y < top || item.width === undefined) return;
  const point = {
    x: event.pageX - left,
    y: event.pageY - top,
  };
  return canvas.restorePointerVpt(point)
}
 // 判断是否包含
// const handleDrop =(fabricDiv:fabric.Object)=>{
//   const objects = canvas.getObjects();
//   let rectList = objects.filter((item: fabric.Object) => (item.type === 'rect'&&item.id!=='workspace')).filter((item: fabric.Object) => item.id !== fabricDiv.id);
//   let result  = rectList?.find((rect:fabric.Object) => {
//     return  fabricDiv.isContainedWithinObject(rect)
//   })
//   if (result) result.set('fill', 'red')
// }

export const addBaseType = (item: fabric.Object, options?: optionsProps) => {
  canvas = getGlobalValue('canvasExample')
  const {event = false, center = true} = options || {};
  item.set({uid: uuid(),});
  if (event) {
    let pointerVpt = handleDragPosition(item, event)
    item.set({left: pointerVpt.x, top: pointerVpt.y,});
  }
  canvas.add(item);
  if (!event && center) {
    handleCenter(item);
  }
  // if(event)handleDrop(item)
  canvas.setActiveObject(item);
  canvas.renderAll();
}


