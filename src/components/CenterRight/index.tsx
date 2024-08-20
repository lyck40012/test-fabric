import React, {useContext, useState} from 'react';
import  style from "./index.less"
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import { InputNumber} from "antd";
import {CanvasContext} from "@/pages/TableList";
type InputNumberProps = 1 | 1920 |1080| null | undefined |number
const CenterRight = () => {
  const  { canvas,canvasSizeObj } = useContext(CanvasContext);
  const [isShow, setIsShow] = useState(true);
  const [width, setWidth] = useState<InputNumberProps>(canvasSizeObj.width);
  const [height, setHeight] = useState<InputNumberProps>(canvasSizeObj.height);
  const handleInputNumberWidthChange = (val:1 | 1920 | null)=>{
    setWidth(val)
    canvas.setWidth(val);
    canvas.renderAll()
  }
  const handleInputNumberHeightChange = (val:1 | 1080 | null)=>{
    setHeight(val)
    canvas.setHeight(val);
    canvas.renderAll()
  }
  return (
    <div className={style.centerRight} style={{width:!isShow&&3}}>
      <div className={style.rightSider} >
        <div className={style.rightSider_name} style={{border:!isShow&&'none'}}>货架商品</div>
        <div className={style.rightSider_sizeBox}>
            <div className={style.rightSider_sizeBox_name}>尺寸</div>
          <div className={style.rightSider_sizeBox_box}>
            <InputNumber   prefix='宽度' variant="filled" value={width} max={1900} min={1}  onChange={handleInputNumberWidthChange} />
            <InputNumber   prefix='高度' variant="filled"  value={height} max={1080} min={1} onChange={handleInputNumberHeightChange}  />
          </div>
        </div>
      </div>
      <div onClick={() => setIsShow(!isShow)} className={style.options}>
        {isShow ? <RightOutlined/> : <LeftOutlined/>}
      </div>
    </div>
  );
};

export default CenterRight;
