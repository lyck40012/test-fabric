import React, {useContext, useState} from 'react';
import style from "./index.less"
import AddIText from "@/image/addIText.png";
import shelves1 from "@/image/shelves/shelves1.png"
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {fabric} from 'fabric'
import {CanvasContext} from "@/pages/TableList";
import {addBaseType} from "@/plugin/AddBaseTypePlugin"
import GoodsInfo from "./GoodsInfo";
const CenterLeft = () => {
  const { setActiveType } = useContext(CanvasContext)
  const [type, setType] = useState('goods');
  const [isShow, setIsShow] = useState(true);
  const changeType = (type: string) => {
    setType(type);
  }
  const addRect = (event?:any)=>{
    const  rect= new fabric.Rect({
      width: 100,
      height: 100,
      stroke:'#000',
      strokeWidth:2,
      fill:'transparent',
      strokeUniform: true
    });
    addBaseType(rect,{ center: true, event })
    setActiveType(rect.type)
  }
    return (
    <div className={style.centerLeft} style={{width:!isShow&&0}}>
      <div className={style.sider} >
        <div className={style.top} style={{border:!isShow&&'none'}}>
         <span
           className={`${type === 'props' ? style.selectItem : ''} ${style.one}`}
           onClick={changeType.bind("_", 'props')}>道具</span>
          <span
            className={type === 'goods' && style.selectItem}
            onClick={changeType.bind("_", 'goods')}>商品</span>
        </div>
        {type === 'props'&& <>
          <div className={style.template}>
            <div className={style.template_name}>货架模板</div>
            <div className={style.template_box}>
              <div className={style.template_box_item} onClick={() => addRect()} draggable={true} onDragEnd={addRect}>
                <img src={shelves1} alt=""/>
                <span>中央货架</span>
              </div>
              <div className={style.template_box_item}>
                <img src={shelves1} alt=""/>
                <span>中央货架</span>
              </div>
              <div className={style.template_box_item}>
                <img src={shelves1} alt=""/>
                <span>中央货架</span>
              </div>
            </div>
            <div className={style.template_box}>
              <div className={style.template_box_item}>
                <img src={shelves1} alt=""/>
                <span>中央货架</span>
              </div>
              <div className={style.template_box_item}>
                <img src={shelves1} alt=""/>
                <span>中央货架</span>
              </div>
              <div className={style.template_box_item}>
                <img src={shelves1} alt=""/>
                <span>中央货架</span>
              </div>
            </div>
          </div>
          <div className={style.textBox}>
            <div className={style.textBox_name}>文字</div>
            <div className={style.textBox_context}>
              <div className={style.textBox_context_item}>
                <img className={style.textBox_context_item_img} src={AddIText} alt=""/>
                <span>正文</span>
              </div>
            </div>
          </div>
        </>}
        {type === 'goods'&&<GoodsInfo/>}
      </div>
      <div onClick={() => setIsShow(!isShow)} className={style.options}>
        {isShow ? <LeftOutlined/> : <RightOutlined/>}
      </div>
    </div>
    );
};

export default CenterLeft;
