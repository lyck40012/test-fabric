import { fabric  } from "fabric"
 let isSpacePressed: boolean =false
let canvas: fabric.Canvas
let dragMode:boolean = false
const _setDring = ()=>{
 canvas.selection = false;
 canvas.getObjects().forEach((obj:any) => {
    obj.selectable = false;
  });
 canvas.requestRenderAll();
}

const _initDring = ()=>{
  canvas.on('mouse:down', (opt:any) => {
    const evt = opt.e;
    if (evt.ctrlKey || dragMode ) {
     canvas.setCursor('grabbing');
      canvas.discardActiveObject();
      _setDring();
      canvas.selection = false;
      canvas.isDragging = true;
      canvas.lastPosX = evt.clientX;
      canvas.lastPosY = evt.clientY;
      canvas.requestRenderAll();
    }
  })

  canvas.on('mouse:move', function (opt:any) {
    if(dragMode) canvas.setCursor('grab');
    if (canvas.isDragging) {
     canvas.discardActiveObject();
    canvas.setCursor('grabbing');
      const { e } = opt;
      if (!canvas.viewportTransform) return;
      const vpt = canvas.viewportTransform;
      vpt[4] += e.clientX - canvas.lastPosX;
      vpt[5] += e.clientY - canvas.lastPosY;
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
      canvas.requestRenderAll();
    }
  });
  canvas.on('mouse:up', function () {
    if (!canvas.viewportTransform) return;
    canvas.setViewportTransform(canvas.viewportTransform);
    canvas.isDragging = false;
    canvas.selection = true;
    canvas.getObjects().forEach((obj) => {
      if (obj.id !== 'workspace' && obj.hasControls) {
        obj.selectable = true;
      }
    });
    if(dragMode) canvas.setCursor('grab');
    canvas.requestRenderAll();
  })
}
export  const initDringPlugin = (canvasDiv:fabric.Object) => {
        canvas = canvasDiv

  _initDring()

}
