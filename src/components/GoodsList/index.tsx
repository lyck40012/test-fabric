import React, {useEffect, useRef, useState} from 'react';
import bg from "./bg.jpg"
import {fabric} from "fabric"
import {getGlobalValue} from "@/plugin/useGlobalState";
import {addBaseType} from "@/plugin/AddBaseTypePlugin"
let lastRef: any = {}
let selectRect: any
let workspaceDiv: any
let rectList: any
let canvas: any
const GoodsList = () => {
  const [itemArr,setItemArr] = useState<any[]>([])
  const [list, setList] = React.useState<any[]>([
    {id: 1, name: '羊毛衫', num: 10, hangType: '正挂'},
    {id: 2, name: '长袖', num: 10, hangType: '侧挂'},
  ])
  const handleDragEnd = (event: any) => {
    selectRect?.set('stroke', '#666666')
    let  filterArr = list.filter(x=>itemArr.includes(x.id))
    filterArr.forEach(x=>{
      const text = new fabric.IText(`${x.hangType}   ${x.name} \n x${x.num}`, {
        // lockScalingX: true,
        // lockScalingY: true,
        fontSize:20
        });
      addBaseType(text, {center: true, event})
    })
    selectRect = null
    setItemArr([])
  }
  const onDragStart = (event:any) => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    canvas = getGlobalValue('canvasExample')
    const objects = canvas.getObjects();
    workspaceDiv = objects.find((obj: any) => obj.id === 'workspace');
    rectList = objects.filter((item: fabric.Object) => (item.type === 'rect' && item.id !== 'workspace' && !item?.customData))
  }
  const handleIsDrag = (position: any) => {
    let result = rectList?.find((rect: fabric.Object) => {
      let positionRect = {
        left: rect?.getBoundingRect().left - workspaceDiv?.getBoundingRect().left,
        top: rect?.getBoundingRect().top - workspaceDiv?.getBoundingRect().top,
        width: rect?.getBoundingRect().width,
        height: rect?.getBoundingRect().height
      }
      let positionItem = {
        x: position?.x - workspaceDiv?.getBoundingRect()?.left,
        y: position?.y - workspaceDiv?.getBoundingRect()?.top,
      }
      if (positionRect.left <= positionItem.x &&
        positionRect.left + positionRect.width >= positionItem.x &&
        positionRect.top <= positionItem.y &&
        positionRect.top + positionRect.height >= positionItem.y) {
        selectRect = rect
        return true
      }
      return false
    })
    if (result) {
      let  filterArr = list.filter(x=>itemArr.includes(x.id))
      selectRect.set('stroke', '#5a9fff')
      selectRect.set('customData', filterArr)
      canvas.renderAll();
    } else {
      selectRect?.set('stroke', '#666666')
      delete selectRect?.customData;
      selectRect?.set({ customData: null });
      selectRect = null
      canvas.renderAll();
    }
  }
  const handleGoodsClick = (val:any)=>{
    let arr = [...itemArr]
    let index = arr.findIndex((item) =>item===val.id)
    if(index!==-1){
      arr.splice(index, 1)
    }else {
      arr.push(val.id)
    }
    setItemArr(arr)
  }
  const handleOnDrag = (event: any) => {
    let canvas = getGlobalValue('canvasExample')
    if (event?.pageX !== lastRef?.pageX || event?.pageY !== lastRef?.pageY) {
      const {left, top} = canvas.getSelectionElement().getBoundingClientRect();
      const point = {
        x: event.pageX - left,
        y: event.pageY - top,
      };
      handleIsDrag(point)
      // console.log(canvas.restorePointerVpt(point))
    }
    lastRef = {
      pageX: event.pageX,
      pageY: event.pageY
    }
    // handleIsDrag(canvas.restorePointerVpt(point))
  }

  return (
    <div>
      {list.map(x => {
        return <div
          style={{
            display: 'flex',
            border:  itemArr.includes(x.id) ?'1px solid red' : 'none',
            margin: 15,
            alignItems: 'center', backgroundColor: '#f5f5f5',cursor:'pointer'}}
          draggable={true}
          onClick={()=>handleGoodsClick(x)}
          onDrag={handleOnDrag}
          onDragEnd={handleDragEnd}
          onDragStart={onDragStart}
        >
          <img src={bg}
               style={{width: 50, height: 70}}
          />
          <div>名称：{x.name}</div>
          <div>方式：{x.hangType}</div>
          <div>数量：{x.num}</div>
        </div>
      })}

    </div>
  );
};

export default GoodsList;
