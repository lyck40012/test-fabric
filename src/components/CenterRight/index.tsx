import React, {useContext, useState} from 'react';
import  style from "./index.less"
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import { InputNumber} from "antd";
import {CanvasContext} from "@/pages/TableList";
type InputNumberProps =  number | null | undefined
import GoodsList from  "@/components/GoodsList"
import  { setSize,option } from "@/plugin/ApplicationEntrancePlugin"
import AttributePosition from "@/components/AttributePosition";
const CenterRight = () => {
  const  { activeType } = useContext(CanvasContext);
  const [isShow, setIsShow] = useState(true);
  const [width, setWidth] = useState<InputNumberProps>(option.width);
  const [height, setHeight] = useState<InputNumberProps>(option.height);
  const handleInputNumberWidthChange = (val:InputNumberProps)=>{
    setWidth(val)
    setSize(val,height)
  }
  const handleInputNumberHeightChange = (val:InputNumberProps)=>{
    setHeight(val)
    setSize(width,val)
  }
  return (
    <div className={style.centerRight} style={{width:!isShow&&3}}>
      <div className={style.rightSider} >
        <div className={style.rightSider_name} style={{border:!isShow&&'none'}}>货架商品</div>
        {!activeType && <div className={style.rightSider_sizeBox}>
          <div className={style.rightSider_sizeBox_name}>画布尺寸</div>
          <div className={style.rightSider_sizeBox_box}>
            <InputNumber prefix='宽度' variant="filled" value={width}  min={1}
                         onChange={handleInputNumberWidthChange}/>
            <InputNumber prefix='高度' variant="filled" value={height}  min={1}
                         onChange={handleInputNumberHeightChange}/>
          </div>
        </div>}
         {/*活动对象属性*/}
        {activeType && <AttributePosition />}

         {/*商品列表*/}
        <GoodsList />
      </div>
      <div onClick={() => setIsShow(!isShow)} className={style.options}>
        {isShow ? <RightOutlined/> : <LeftOutlined/>}
      </div>
    </div>
  );
};

export default CenterRight;
