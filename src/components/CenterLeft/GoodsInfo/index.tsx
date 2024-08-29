import React, {useContext, useEffect} from 'react';
import style from "./index.less"
import {Button, Checkbox, Input, message} from 'antd';
import { SearchOutlined} from "@ant-design/icons";
import FilterIcon from "@/image/FilterIcon.png"
import Yif from "./yif.png"
import { fabric } from "fabric"
import {CanvasContext} from "@/pages/TableList";
import {addBaseType} from "@/plugin/AddBaseTypePlugin";
const Index = () => {

  const { canvas } = useContext(CanvasContext)
  const [selectItemArr, setSelectItemArr] = React.useState<any[]>([]);
  const goodsType =[
    { id:1, name:"童装" },
    { id:2, name:"男装" },
    { id:3, name:"女装" },
    { id:4, name:"其他" },
  ]

  const goodsList = [
    {id:1,name:'女装',slider:'正挂',price:'13.2',inventoryNum:12,placedNum:34},
    {id:2,name:'羊毛衫',slider:'侧挂挂',price:'165.2',inventoryNum:54,placedNum:234},
    {id:3,name:'羊毛衫',slider:'侧挂',price:'165.2',inventoryNum:54,placedNum:234},
    {id:4,name:'羊毛衫',slider:'侧挂挂',price:'165.2',inventoryNum:54,placedNum:234},
    {id:5,name:'羊毛衫',slider:'侧挂挂',price:'165.2',inventoryNum:54,placedNum:234},
    {id:6,name:'羊毛衫',slider:'侧挂挂',price:'165.2',inventoryNum:54,placedNum:234},
    {id:7,name:'羊毛衫',slider:'侧挂挂',price:'165.2',inventoryNum:54,placedNum:234},
    {id:8,name:'羊毛衫',slider:'侧挂挂',price:'165.2',inventoryNum:54,placedNum:234},
  ]
  const handleClick = (val:any)=>{
    let arr = [...selectItemArr]
    let index = arr.findIndex((item) =>item===val.id)
    if(index!==-1){
      arr.splice(index, 1)
    }else {
      arr.push(val.id)
    }
    setSelectItemArr(arr)
  }
  const handleAddShelves = ()=>{
    let activeObject = canvas.getActiveObject()
    if(activeObject){
      activeObject.set('fill','transparent')
      const { x,y } = activeObject.getCenterPoint()
      const text = new fabric.IText(`正挂  长袖 \n x32`, {
        lockScalingX: true,
        lockScalingY: true,
        fontSize:24,
      });
      const { width,height } = text
      text.set('left',x-width/2)
      text.set('top',y-height/2)
      addBaseType(text, {center: false})
    }else {
      message.error('请选择要添加的货价')
    }
  }
  const handleDragItemEnd = (event:any)=>{
    let activeObject = canvas.getActiveObject()
    if(activeObject){
      activeObject.set('fill','transparent')
      const text = new fabric.IText(`正挂  长袖 \n x32`, {
        fontSize:24,
      });
      addBaseType(text, {center: false,event})
    }else {
      message.error('请选择要添加的货价')
    }
  }
  return (
    <div className={style.goodsInfo}>
      <div className={style.goodsInfo_search}>
        <span>商品列表</span>
        <Input  style={{width:200}} placeholder="商品名称" prefix={<SearchOutlined />} />
        <img src={FilterIcon}  alt=''/>
      </div>
      <div className={style.goodsInfo_goodsType}>
        {goodsType.map((item,index) => (
          <div
            style={{
              border:  selectItemArr.includes(item.id) ?'1px solid red' : '1px solid rgba(0, 0, 0, 0.3)',
              color: selectItemArr.includes(item.id) ?'red':'#666666'
            }}
            className={style.goodsInfo_goodsType_item}
            key={item.id} onClick={()=>handleClick(item)}>{item.name}</div>
        ))}
      </div>
      <div className={style.goodsInfo_goodsNum}>
        <span>商品数量：666</span>
        <a>取消选择</a>
      </div>
      <div className={style.goodsInfo_selectBox}>
        <span className={style.goodsInfo_selectBox_left}>已选 666 项</span>
        <Button className={style.goodsInfo_selectBox_right} onClick={handleAddShelves}>添加到选中货架</Button>
      </div>
      <div className={style.goodsInfo_goodsList}>
        <Checkbox.Group onChange={(e)=>{
          console.log(e)
        }}>
          {goodsList.map((item,index) => (
            <div key={item.id}

                 className={style.goodsInfo_goodsList_item} draggable
                 onDragEnd={handleDragItemEnd}>
              <div className={style.goodsInfo_goodsList_item_left}>
                <img className={style.goodsInfo_goodsList_item_left_img} src={Yif} alt=""/>
                <div className={style.goodsInfo_goodsList_item_left_tag}
                     style={{backgroundColor: true ? '#FFC300' : '#FA5151'}}
                >限定
                </div>
              </div>
              <div className={style.goodsInfo_goodsList_item_right}>
                <div className={style.goodsInfo_goodsList_item_right_oneDiv}>
                  <div className={style.goodsInfo_goodsList_item_right_oneDiv_left}><span>31</span>/冬季</div>
                  <div className={style.goodsInfo_goodsList_item_right_oneDiv_right}>货架中</div>
                </div>
                <div className={style.goodsInfo_goodsList_item_right_twoDiv}>
                  <span>{item.name}</span>
                  <Checkbox value={item.id} style={{width: 20}}/>
                </div>
                <div className={style.goodsInfo_goodsList_item_right_threeDiv}>
                  <span className={style.goodsInfo_goodsList_item_right_threeDiv_price}>¥{item.price}</span>
                  <span className={style.goodsInfo_goodsList_item_right_threeDiv_number}>摆放数量 {item.placedNum}件 库存{item.inventoryNum}件</span>
                  <span className={style.goodsInfo_goodsList_item_right_threeDiv_detail}>详情</span>
                </div>
              </div>
            </div>
          ))}

        </Checkbox.Group>
      </div>
    </div>
  );
};

export default Index;
