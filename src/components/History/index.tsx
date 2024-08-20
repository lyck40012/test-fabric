import React from 'react';
import {Button, Divider, Tooltip} from "antd";
import Revocation from  "@/image/Revocation.png"
import Restore from  "@/image/restore.png"
import ClearCanvas from "@/image/clearCanvas.png"
const History = () => {
  return (
    <div>
      <Tooltip title="撤销">
        <Button type="text">
          <img src={Revocation} alt=""/>
        </Button>
      </Tooltip>
      <Tooltip title="恢复">
        <Button type="text">
          <img src={Restore} alt=""/>
        </Button>
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title="清空画布">
        <Button type="text">
          <img src={ClearCanvas} alt=""/>
        </Button>
      </Tooltip>
    </div>
  );
};

export default History;
