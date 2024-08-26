import {getGlobalValue} from "@/plugin/useGlobalState";
import {fabric} from 'fabric'
export const handleCenter = (item:fabric.Object)=>{
  let canvas = getGlobalValue('canvasExample')
  const center = canvas.getCenterPoint();
  canvas._centerObject(item, center)
}
