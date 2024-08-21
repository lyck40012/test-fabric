import {getGlobalValue} from "@/plugin/useGlobalState";
import {fabric} from 'fabric'
export const handleCenter = (item:fabric.Object)=>{
  let canvas = getGlobalValue('canvasExample')
  const center = canvas.getCenterPoint();
  console.log(center)
  canvas._centerObject(item, center)
}
