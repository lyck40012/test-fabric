import React, {useContext, useId} from 'react';
import {Button, ColorPicker, Space} from "antd";
import  {CanvasContext} from "./index"
import {fabric} from 'fabric'
import { downFile } from "@/utils/utils"
const MyComponent = () => {
  const  { canvas,activeObject } = useContext(CanvasContext);
  const handlePosition = () => {
    if (activeObject) {
      activeObject.set('left', 300);
      activeObject.set('top', 500);
      canvas.renderAll();
    }
  }
  const fuzhi = () => {
    if (activeObject) {
      activeObject.clone((cloned: any) => {
        cloned.set({
          left: cloned.left + 20,
          top: cloned.top + 20
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
      })
    }
  }
  const handleDelete = () => {

    canvas.remove(activeObject);
  }
  const onChange = (val: any) => {

    let color = val.toHexString()
    if (activeObject) {
      activeObject.set('fill', color); // 修改对象的填充颜色
      canvas.renderAll(); // 重新渲染画布
    }
  }
  const addRect = ()=>{
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      fill: '#FFFFCC',
      stroke: 'black',
      strokeWidth: 2,
    });
    canvas.add(rect)
  }
  const addCircle =()=>{
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 70,
      fill: '#57606BFF',
      name: '圆形',
    });
    canvas.add(circle)
  }
  const handleExportJson = ()=>{
    const  dataUrl  = canvas.toJSON([
      'id',
      'gradientAngle',
      'selectable',
      'hasControls',
      'linkData',
      'editable',
      'extensionType',
      'extension',
      'verticalAlign',
      'roundValue',
    ])
    const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, '\t')
    )}`;
    downFile('测试JSON',fileStr, 'json');
  }
  const handleSaveImage = ()=>{
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.src = 'image.jpg';
    let dataURL = canvas.toDataURL();
    downFile('测试图片',dataURL,'png')
  }
  const addIText = ()=>{
    const text = new fabric.IText('请输入编辑字体', {
      fontSize: 30,
      fill: '#000000FF',
    });
    canvas.add(text)
  }
  return (
    <div>
      <div style={{marginBottom:20}}>
        <h3>操作</h3>
        <Space>
          <ColorPicker defaultValue="#1677ff" onChange={onChange}/>
          <Button onClick={fuzhi}>复制</Button>
          <Button onClick={handlePosition}>改变位置</Button>
          <Button onClick={handleDelete}>删除</Button>
          <Button onClick={handleExportJson}>导出为JSON</Button>
          <Button onClick={handleSaveImage}>保存为图片</Button>
        </Space>
      </div>
      <div style={{marginBottom: 20}}>
        <h3>图形</h3>
        <Space>
          <Button onClick={addRect}>正方形</Button>
          <Button onClick={addCircle}>圆形</Button>
          <Button onClick={addIText}>可编辑文字</Button>
        </Space>
      </div>

    </div>
  );
};

export default MyComponent;
