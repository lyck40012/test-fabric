export const canvasSize = (canvas)=>{
  canvas.on("mouse:wheel", function (option) {
    // 判断是放大还是缩小
    const delta = option.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: option.e.offsetX, y: option.e.offsetY }, zoom);
    option.e.preventDefault();
    option.e.stopPropagation();
  });
}


