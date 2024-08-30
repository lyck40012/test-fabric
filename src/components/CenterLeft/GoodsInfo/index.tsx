import React, {useContext, useEffect, useState} from 'react';
import style from "./index.less"
import {Button, Checkbox, Input, message} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import FilterIcon from "@/image/FilterIcon.png"
import Yif from "./yif.png"
import {fabric} from "fabric"
import {CanvasContext} from "@/pages/TableList";
import arrow from "@/image/arrow.png"
let lastRef: any = {}
let isArea: boolean = false;
const Index = () => {
  const {canvas} = useContext(CanvasContext)
  const [selectTypeArr, setSelectTypeArr] = React.useState<any[]>([]);
  const [selectItemList, setSelectItemList] = React.useState<any[]>([]);
  const [goodsList, setGoodsList] = useState([
    {id: 1, name: '女装', slider: '正挂', price: '13.2', inventoryNum: 12, placedNum: 34},
    {id: 2, name: '羊毛衫大量长毛色染色', slider: '侧挂', price: '165.2', inventoryNum: 54, placedNum: 234},
    {id: 3, name: '羊毛衫', slider: '侧挂', price: '165.2', inventoryNum: 54, placedNum: 234},
    {id: 4, name: '羊毛43衫', slider: '正挂', price: '165.2', inventoryNum: 54, placedNum: 234},
    {id: 5, name: '羊毛34衫', slider: '侧挂', price: '165.2', inventoryNum: 54, placedNum: 234},
    {id: 6, name: '羊毛23衫', slider: '正挂', price: '165.2', inventoryNum: 54, placedNum: 234},
    {id: 7, name: '羊毛3衫', slider: '侧挂', price: '165.2', inventoryNum: 54, placedNum: 234},
    {id: 8, name: '羊毛衫', slider: '正挂', price: '165.2', inventoryNum: 54, placedNum: 234},
  ])
  const goodsType = [
    {id: 1, name: "童装"},
    {id: 2, name: "男装"},
    {id: 3, name: "女装"},
    {id: 4, name: "其他"},
  ]
  // 矩形框内重新分配空间
  const handleReArrangement = (objectsInGroup:any) => {
    let groupActive = canvas.getActiveObject()
    let uid = groupActive.get('uid')
    const { objects,...others} = groupActive.toObject()
    const {x} = groupActive.getCenterPoint()
    objectsInGroup.forEach(a=>{
      console.log(a.type)
    })
    let iTextAll1 = objectsInGroup.filter((n:fabric.object)=>n.type==='textbox'&&n.iTextType==='goodsSuspensionMethod')
    let iTextAll2 = objectsInGroup.filter((n:fabric.object)=>n.type==='textbox'&&n.iTextType==='goodsName')
    let newGroup = new fabric.Group([objectsInGroup[0]], {
      ...others,
      uid
    });
    if(iTextAll1.length){
      iTextAll1.forEach((item:fabric.object,index:number) => {
        let  { height } = iTextAll1[index]
        // item.set('left', x - width / 2)  // 设置中心
        item.set('left', groupActive.left+4)
        let top =  groupActive.top + (2*(index+1)-1)/(iTextAll1.length*2)*groupActive.height - height/2
        item.set('top', top)
        newGroup.addWithUpdate(item);
      })
      // 处理名称
      iTextAll2.forEach((item:fabric.object,index:number) => {
      const { height } = iTextAll2[index]
        let  { width } = iTextAll1[index]
        // item.set('left', x - width / 2)
        item.set('left', groupActive.left+width+8)
        let top =  groupActive.top + (2*(index+1)-1)/(iTextAll2.length*2)*groupActive.height - height/2
        item.set('top', top)
        item.set('itextGroupTop',(2*(index+1)-1)/(iTextAll2.length*2)*groupActive.height)
        newGroup.addWithUpdate(item);
      })
    }
    canvas.remove(groupActive);
    canvas.add(newGroup);
    canvas.setActiveObject(newGroup);
    canvas.renderAll();
  }
  const handleClick = (val: any) => {
    let arr = [...selectTypeArr]
    let index = arr.findIndex((item) => item === val.id)
    if (index !== -1) {
      arr.splice(index, 1)
    } else {
      arr.push(val.id)
    }
    setSelectTypeArr(arr)
  }
  const handleAddRect = (activeObject:any)=>{
    let groupActive = canvas.getActiveObject()
    let objectsInGroup = groupActive.getObjects();
    let uid = groupActive.get('uid')
    let groupActiveBound = groupActive.getBoundingRect()
    let customData = activeObject.get('customData') || []
    activeObject?.set('fill', 'transparent')
    let selectArr = goodsList.filter(x => selectItemList.includes(x.id)) || []
    let customDataIdArr = customData?.map(x=>x.id)
    let filterArr = selectArr.filter(x=>!customDataIdArr.includes(x.id))
    let customDataArr = [...customData, ...filterArr]
    activeObject?.set('customData', customDataArr)
    filterArr.forEach((item) => {
      const text = new fabric.Textbox(`${item.slider}`, {
        width:50,
        fontSize: 24,
        id:item.id,
        splitByGrapheme: true,
        iTextType: 'goodsSuspensionMethod',
        uid: `iText/${uid}/goodsSuspensionMethod/${item.id}`,
      });
      objectsInGroup.push(text)
    })
    filterArr.forEach((item) => {
      const text = new fabric.Textbox(`${item.name}`, {
        fontSize: 24,
        id:item.id,
        width:groupActiveBound.width-50-12,
        iTextType: 'goodsName',
        textAlign: 'left',
        uid: `iText/${uid}/goodsName/${item.id}`,
      });
     let flag =  groupActiveBound.width < 50-12 + text.width
      if(flag){
        text.set('splitByGrapheme',true)
        text.set('fontSize',15)
      }
      objectsInGroup.push(text)
    })
    // 处理重新分配空间
    handleReArrangement(objectsInGroup)
  }
  const handleAddShelves = () => {
    let activeObject = canvas.getActiveObject()?.getObjects().find(x => x.type === 'rect')
    if (activeObject) {
      handleAddRect(activeObject)
      // 重新排列
    } else {
      message.error('请选择要添加的货价')
    }
  }
  const onDragStart = (event: any) => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  }
  const handleDragItemEnd = (event: any) => {
    let activeObject = canvas.getActiveObject()?.getObjects().find(x => x.type === 'rect')
    if (activeObject && isArea && activeObject.type === 'rect') {
      activeObject?.set('stroke', '#666666')
      handleAddRect(activeObject)
    } else {
      if (activeObject) message.error('请选择要添加的货架')
    }
  }
  // 计算位置
  const handleCalcPosition = (position: any) => {
    let {left, top, width, height} = canvas.getActiveObject()?.getBoundingRect()
    return left <= position.x && left + width >= position.x && top <= position.y && top + height >= position.y
  }
  const handleIsDrag = (position: any) => {
    let activeObject = canvas.getActiveObject()?.getObjects().find(x => x.type === 'rect')
    if (activeObject && activeObject.type === 'rect') {
      // 计算位置
      if (handleCalcPosition(position)) {
        activeObject?.set('stroke', '#5a9fff')
        activeObject?.set('fill', 'transparent')
        canvas.renderAll();
        isArea = true
      } else if (activeObject?.customData?.length) {
        isArea = false
        activeObject?.set('stroke', '#666666')
      } else {
        isArea = false
        let img = new Image();
        img.src = arrow;
        img.onload = function () {
          let pattern = new fabric.Pattern({
            source: img,
            repeat: 'no-repeat'
          });
          activeObject?.set('stroke', '#666666')
          activeObject?.set('fill', pattern)
          activeObject = null
          canvas.renderAll();
        }
      }
    }
  }
  const handleOnDrag = (event: any) => {
    if (event?.pageX !== lastRef?.pageX || event?.pageY !== lastRef?.pageY) {
      const {left, top} = canvas.getSelectionElement().getBoundingClientRect();
      const point = {
        x: event.pageX - left,
        y: event.pageY - top,
      };
      handleIsDrag(point)
    }
    lastRef = {
      pageX: event.pageX,
      pageY: event.pageY
    }
  }
  return (
    <div className={style.goodsInfo}>
      <div className={style.goodsInfo_search}>
        <span>商品列表</span>
        <Input style={{width: 200}} placeholder="商品名称" prefix={<SearchOutlined/>}/>
        <img src={FilterIcon} alt=''/>
      </div>
      <div className={style.goodsInfo_goodsType}>
        {goodsType.map((item, index) => (
          <div
            style={{
              border: selectTypeArr.includes(item.id) ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.3)',
              color: selectTypeArr.includes(item.id) ? 'red' : '#666666'
            }}
            className={style.goodsInfo_goodsType_item}
            key={item.id} onClick={() => handleClick(item)}>{item.name}</div>
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
        <Checkbox.Group onChange={(e) => {
          setSelectItemList(e)
        }}>
          {goodsList.map((item, index) => (
            <div key={item.id}
                 className={style.goodsInfo_goodsList_item} draggable
                 onDragStart={onDragStart}
                 onDrag={handleOnDrag}
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
                  <span
                    className={style.goodsInfo_goodsList_item_right_threeDiv_number}>摆放数量 {item.placedNum}件 库存{item.inventoryNum}件</span>
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
