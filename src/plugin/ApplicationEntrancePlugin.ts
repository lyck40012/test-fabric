import {fabric} from "fabric"
import {debounce} from "lodash";

let workspaceEl: any
let workspace: null | fabric.Rect;
export let option = {
  width: 800,
  height: 600,
};
let canvas: null | fabric.Rect;
let zoomRatio: number = 0.85
let resizeObserver!: ResizeObserver;
const _initBackground = () => {
  canvas.setWidth(workspaceEl.offsetWidth);
  canvas.setHeight(workspaceEl.offsetHeight);
}
export const getWorkspase = () => {
  return canvas.getObjects().find((item: any) => item.id === 'workspace') as fabric.Rect;
}
const _getScale = () => {
  return fabric.util.findScaleToFit(getWorkspase(), {
    width: workspaceEl.offsetWidth,
    height: workspaceEl.offsetHeight,
  });
}
export const setWorkspaseBg = (color: string)=> {
  const workspase =getWorkspase();
  workspase?.set('fill', color);
}
const setCenterFromObject = (obj: fabric.Rect) => {
  const objCenter = obj.getCenterPoint();
  const viewportTransform = canvas.viewportTransform;
  if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
  viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
  viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
  canvas.setViewportTransform(viewportTransform);
  canvas.renderAll();
}
const setZoomAuto = (scale: number) => {
  const width = workspaceEl.offsetWidth;
  const height = workspaceEl.offsetHeight;
  canvas.setWidth(width);
  canvas.setHeight(height);
  const center = canvas.getCenter();
  canvas.setViewportTransform(fabric.iMatrix.concat());
  canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);
  if (!workspace) return;
  setCenterFromObject(workspace);
  // 超出画布不展示
  workspace.clone((cloned: fabric.Rect) => {
    canvas.clipPath = cloned;
    canvas.requestRenderAll();
  });
}
const auto = () => {
  const scale = _getScale();
  setZoomAuto(scale * zoomRatio);
}
export const setSize = (width: number, height: number)=> {
  _initBackground();
 option.width = width;
  option.height = height;
  // 重新设置workspace
  workspace = canvas
    .getObjects()
    .find((item) => item.id === 'workspace') as fabric.Rect;
  workspace.set('width', width);
 workspace.set('height', height);
  // editor.emit('sizeChange', this.workspace.width, this.workspace.height);
 auto();
}

const _initWorkspace = () => {
  const {width, height} = option;
  const workspaceRect = new fabric.Rect({
    fill: 'rgba(255,255,255,1)',
    width,
    height,
    id: 'workspace',
    strokeWidth: 0,
    hasControls:false,
    selectable:false
  });
  workspaceRect.hoverCursor = 'default';
  canvas.add(workspaceRect);
  canvas.renderAll();
  workspace = workspaceRect
  if (canvas.clearHistory) {
    canvas.clearHistory();
  }
  auto()
}

const _initResizeObserve = () => {
  const resizeObservers = new ResizeObserver(
    debounce(() => {
      auto();
    }, 0)
  );
  resizeObserver = resizeObservers;
  resizeObserver.observe(workspaceEl);
}

const _bindWheel = () => {
  canvas.on('mouse:wheel', function (opt) {
    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    const center = canvas.getCenter();
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
}
export const entranceInit = (canvasDiv: fabric.Object) => {
  canvas = canvasDiv
  workspaceEl = document.getElementById('workspace')
  if (!workspaceEl) {
    throw new Error('element #workspace is missing, plz check!');
  }
  _initBackground()
  _initWorkspace()
  _initResizeObserve()
  _bindWheel()
}








