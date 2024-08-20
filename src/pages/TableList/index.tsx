import React, {useEffect,useState} from 'react';
import {fabric} from 'fabric'
import style from "./index.less"
import  Tools from "./Tools";
import hotkeys from 'hotkeys-js';
import  { canvasSize } from "@/plugin/AddBaseTypePlugin";
import History from "@/components/History";
import {Button, Divider,  Layout, Select, Space, Tooltip} from 'antd';
import AddIText from "@/image/addIText.png";
import SaveOptions from "@/components/SaveOptions";
import CenterLeft from "@/components/CenterLeft";
import CenterRight from "@/components/CenterRight";
const { Header} = Layout;
export const CanvasContext = React.createContext({})
const MyComponent = () => {
  const [canvas, setCanvas] = useState<any>(null)
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');
    setCanvas(canvas)
    // 重写 toObject 方法以包含自定义数据
    fabric.Rect.prototype.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          customData: this.customData
        });
      };
    })(fabric.Rect.prototype.toObject);
    // canvasSize(canvas)
  }, []);

  return (
    <CanvasContext.Provider value={{canvas}}>
      <Tools />
      <Layout className={style.content}>
        {/*头部*/}
        <Header className={style.top}>
          <Select
            defaultValue='HangZhou'
            options={[
              {
                value: 'HangZhou',
                label: 'HangZhou #310000',
              },
              {
                value: 'NingBo',
                label: 'NingBo #315000',
              },
            ]} />
          <Space>
            <History />
            <Divider type='vertical' />
            <Tooltip title="添加文字">
              <Button type="text">
                <img src={AddIText} alt=""/>
              </Button>
            </Tooltip>
          </Space>
          <SaveOptions />
        </Header>
        <div className={style.canvasContent}>
          <CenterLeft />
          <div className={style.workspace} id="workspace">
            <canvas id='canvas' style={{backgroundColor:'#fff'}} width={500} height={500}></canvas>
          </div>
          <CenterRight />
        </div>
      </Layout>
    </CanvasContext.Provider>
  );
};

export default MyComponent;
