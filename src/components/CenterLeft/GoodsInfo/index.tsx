import React from 'react';
import style from "./index.less"
import {Button, Checkbox, Input } from 'antd';
import { SearchOutlined} from "@ant-design/icons";
import FilterIcon from "@/image/FilterIcon.png"
import Yif from "./yif.png"
const Index = () => {
  const [selectItemArr, setSelectItemArr] = React.useState<any[]>([]);
  const goodsType =[
    { id:1, name:"童装" },
    { id:2, name:"男装" },
    { id:3, name:"女装" },
    { id:4, name:"其他" },
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
        <Button className={style.goodsInfo_selectBox_right}>添加到选中货架</Button>
      </div>
      <div className={style.goodsInfo_goodsList}>
        <Checkbox.Group>
          <div className={style.goodsInfo_goodsList_item}>
              <div className={style.goodsInfo_goodsList_item_left}>
                <img className={style.goodsInfo_goodsList_item_left_img} src={Yif} alt=""/>
                 <div className={style.goodsInfo_goodsList_item_left_tag}
                  style={{backgroundColor:true?'#FFC300':'#FA5151'}}
                 >限定</div>
              </div>
            <div className={style.goodsInfo_goodsList_item_right}>
              <div className={style.goodsInfo_goodsList_item_right_oneDiv}>
                <div className={style.goodsInfo_goodsList_item_right_oneDiv_left}><span>31</span>/冬季</div>
                <div className={style.goodsInfo_goodsList_item_right_oneDiv_right}>货架中</div>
              </div>
              <div className={style.goodsInfo_goodsList_item_right_twoDiv}>
                <span>女装CPJ保暖WARM PADDED茄克</span>
                <Checkbox value={1} style={{width:20}} />
              </div>
              <div className={style.goodsInfo_goodsList_item_right_threeDiv}>
                <span className={style.goodsInfo_goodsList_item_right_threeDiv_price}>¥155</span>
                <span className={style.goodsInfo_goodsList_item_right_threeDiv_number}>摆放数量 37件 库存37件</span>
                <span className={style.goodsInfo_goodsList_item_right_threeDiv_detail}>详情</span>
              </div>
            </div>
          </div>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default Index;
