import React, {useEffect, useRef, useState} from 'react';
import {fabric} from 'fabric'
import style from "./index.less"
import  Tools from "./Tools";
import History from "@/components/History";
import {Button, Divider,  Layout, Select, Space, Tooltip} from 'antd';
import AddIText from "@/image/addIText.png";
import SaveOptions from "@/components/SaveOptions";
import CenterLeft from "@/components/CenterLeft";
import CenterRight from "@/components/CenterRight";
import RightMenu from "@/components/RightMenu";
import {setGlobalValue} from "@/plugin/useGlobalState"
import {entranceInit} from "@/plugin/ApplicationEntrancePlugin";
import {initDringPlugin} from "@/plugin/DringPlugin";
import DateSelectType from "@/components/DateSelectType";
const { Header} = Layout;
export const CanvasContext = React.createContext({})
const MyComponent = () => {
  const [activeType, setActiveType] = useState<string>('')
  const [canvas,setCanvas] = useState<any>()
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas',{
      fireRightClick: true,
      stopContextMenu: true,
      preserveObjectStacking: true
    });
    canvas.on('mouse:down', (opt:any)=>{
      if(opt.button === 1){
        setGlobalValue('canvasActiveType',canvas.getActiveObject()?.type)
        setActiveType(canvas.getActiveObject()?.type)
      }
    });
    setCanvas(canvas)
    // 入口
    initDringPlugin(canvas)
    entranceInit(canvas)
    // 重写 toObject 方法以包含自定义数据
    fabric.Rect.prototype.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          customData: this.customData,
          id: this.id,
          uid: this.uid,
          selectable: this.selectable,
          hasControls: this.hasControls,
          hoverCursor: this.hoverCursor
        });
      };
    })(fabric.Rect.prototype.toObject);
    setGlobalValue('canvasExample',canvas)
  }, []);
  useEffect(()=>{
    let footer = document.getElementsByTagName('footer')
    console.dir(footer[0])
    footer[0].style.display="none"
    return ()=>{
      footer[0].style.display="block"
    }
  },[])
  return (
    <CanvasContext.Provider value={{activeType , setActiveType ,canvas}}>
      {/*<Tools />*/}
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
            <DateSelectType />
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
          <CenterLeft  />
          <div className={style.workspace} id='workspace'>
            <canvas id='canvas'></canvas>
            <RightMenu/>
          </div>
          <CenterRight />
        </div>
      </Layout>
    </CanvasContext.Provider>
  );
};

export default MyComponent;
