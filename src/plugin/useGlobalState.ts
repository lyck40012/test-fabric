import  { fabric } from 'fabric'
interface GlobalStateProps {
  canvasExample: fabric.Canvas;
  canvasActiveType:string,
}

const globalState: GlobalStateProps = {
  canvasExample: '',
  canvasActiveType:''
};

// 获取全局状态值
export const getGlobalValue = (key:string): any => {
  // @ts-ignore
  return globalState[key];
};

// 获取全局状态值
export const getGlobalAllValue = (): GlobalStateProps => {
  // @ts-ignore
  return globalState;
};

// 设置全局状态值
export const setGlobalValue = (key:string,newValue: any): void => {
  // @ts-ignore
  globalState[key] = newValue;
};

