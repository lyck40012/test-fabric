import React, {useContext, useEffect} from 'react';
import {Button, Divider, Modal, Tooltip} from "antd";
import Revocation from  "@/image/Revocation.png"
import Restore from  "@/image/restore.png"
import ClearCanvas from "@/image/clearCanvas.png"
import "@/utils/fabric-history.js"
import { setWorkspaseBg } from "@/plugin/ApplicationEntrancePlugin"
import {CanvasContext} from "@/pages/TableList";

const History = () => {
  const { canvas } = useContext(CanvasContext)

  const undo = ()=>{
    canvas.undo()
  }
  const redo = ()=>{
    canvas.redo()
  }
  const clearCanvas = ()=>{
    Modal.confirm({
      title:'提示',
      content:'确认要清空吗？',
      onOk:()=>{
        canvas.getObjects().forEach((obj:any) => {
          if (obj.id !== 'workspace') {
           canvas.remove(obj);
          }
        });
        canvas.clearHistory(false)
        setWorkspaseBg('#fff');
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    })
  }
  return (
    <div>
      <Tooltip title="撤销" >
        <Button type="text" onClick={undo}>
          <img src={Revocation} alt=""/>
        </Button>
      </Tooltip>
      <Tooltip title="恢复" >
        <Button type="text" onClick={redo}>
          <img src={Restore} alt=""/>
        </Button>
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title="清空画布">
        <Button type="text" onClick={clearCanvas}>
          <img src={ClearCanvas} alt=""/>
        </Button>
      </Tooltip>
    </div>
  );
};

export default History;
