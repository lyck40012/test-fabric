import React, {useContext} from 'react';
import  './index.less'
import {CanvasContext} from "@/pages/TableList";
const TagContent = () => {
  const { canvas } = useContext(CanvasContext)
   // 处理标签的坐标
  const handleTriangleTag = ()=>{

  }
  const handleItem = (color:string,tag?:string)=>{
    let allGroup = canvas.getObjects().filter(x=>x.type==='group');
    allGroup.forEach((group:any)=>{
      let groupPosition  = group.getBoundingRect()
      console.log("组的位置====>",groupPosition)
      group.getObjects().filter(m=>m.type==='i-text'&&m.iTextType==='goodsName').forEach(x=>{
        if(x.get('id')/2!==1){
          // console.log(x.getCenterPoint())
          console.log("中心位置===>",x,x.getBoundingRect(true))
          x.set('backgroundColor', color)
        }else {
          x.set('backgroundColor', '')
        }
      })
    })
    canvas.renderAll()
  }

  return (
    <div className="tagContent">
      <div className='horizontal'>
        <div className='item' onClick={() => handleItem('#FFF8C6')}>
          <div className='colorBlock'></div>
          <span>初次投入</span>
        </div>
        <div className='item' onClick={() => handleItem('#ffd7ed')}>
          <div className='colorBlock'></div>
          <span>限定</span>
        </div>
        <div className='item' onClick={() => handleItem('#eb2f96','高回转')}>
          <div className='colorBlock'></div>
          <span>高回转</span>
        </div>
      </div>
    </div>
  );
};

export default TagContent;
