import { fabric } from "fabric"

const _emitSelectEvent = ()=>{

}

export const _initSelectEvent = (canvas: fabric.canvas) => {
  if(canvas){
    canvas.on('selection:created', () => _emitSelectEvent());
     canvas.on('selection:updated', () => _emitSelectEvent());
    canvas.on('selection:cleared', () => _emitSelectEvent());
  }
}
