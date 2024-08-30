import React, {useEffect, useRef, useState} from 'react';
import {fabric} from 'fabric'
import style from "./index.less"
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
import {initControls} from "@/plugin/ControlsPlugin";
import TagContent from "@/components/TagContent";
const { Header} = Layout;
export const CanvasContext = React.createContext({})
const MyComponent = () => {
  const [activeType, setActiveType] = useState<string>('')
  const [canvas,setCanvas] = useState<any>()
   // 初始化canvas
  const _initCanvas = (canvas:fabric.canvas)=>{
    canvas.on('mouse:down', (opt:any)=>{
      if(opt.button === 1){
        setGlobalValue('canvasActiveType',canvas.getActiveObject()?.type)
        setActiveType(canvas.getActiveObject()?.type)
      }
    });
    // 入口
    initDringPlugin(canvas)
    entranceInit(canvas)
    initControls()
    setGlobalValue('canvasExample',canvas)
  }
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas',{
      fireRightClick: true,
      stopContextMenu: true,
      preserveObjectStacking: true
    });
    _initCanvas(canvas)
    setCanvas(canvas)
    fabric.Rect.prototype.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          customData: this.customData,
          id: this.id,
          uid: this.uid,
          selectable: this.selectable,
          hasControls: this.hasControls,
          hoverCursor: this.hoverCursor,
          itextGroupLeft: this.itextGroupLeft,
          itextGroupTop: this.itextGroupTop,
          iTextType:this.iTextType,
        });
      };
    })(fabric.Rect.prototype.toObject);
  }, []);
  useEffect(()=>{
    let footer = document.getElementsByTagName('footer')
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
            <TagContent />
          </div>
          <CenterRight />
        </div>
      </Layout>
    </CanvasContext.Provider>
  );
};

export default MyComponent;
