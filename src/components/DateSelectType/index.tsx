import {Radio, Select} from 'antd';
import React, {useEffect, useRef} from 'react';
import  style from './index.less';
import {DownOutlined, LeftOutlined} from "@ant-design/icons";
import  DeleteIcon from "@/image/deleteIcon.png"
import CheckIcon from "@/image/CheckIcon.png"
import AddLayout from  "@/image/AddLayout.png"
const DateSelectType = () => {
  const [isMenuShow, setIsMenuShow] = React.useState<boolean>(false)
  const menuShow = useRef<any>(false)
  const menuRef = useRef(null)
  const handleShowMenu = ()=>{
    console.log(12)
    setIsMenuShow(true)
    menuShow.current = true
  }
  useEffect(()=>{
    // document.addEventListener('click',(e:any)=>{
    //   console.log(menuRef?.current?.contains(e.target),isMenuShow)
    //    if(!menuRef?.current?.contains(e.target)&&menuShow.current){
    //      setIsMenuShow(false)
    //      menuShow.current = false
    //    }
    //   })
  },[])
  return (
    <div className={style.dateSelectType}>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">周次</Radio.Button>
        <Radio.Button value="b">月次</Radio.Button>
        <Radio.Button value="c">标准</Radio.Button>
      </Radio.Group>
      <div className={style.datebox}>
        <span onClick={handleShowMenu}>2021年2月1日周 <DownOutlined /></span>
        {isMenuShow && <div className={style.datebox_content} ref={menuRef}>
          <div className={style.datebox_content_title}><LeftOutlined style={{fontSize: 10, marginRight: 10}}/>2024年2月
          </div>
          <div className={style.datebox_content_item}>
            <div className={style.datebox_content_item_left}>2024年2月1日 <img src={CheckIcon} alt=""/></div>
            <img className={style.datebox_content_item_right} src={DeleteIcon} alt=''/>
          </div>
          <div className={style.datebox_content_item}>
            <div className={style.datebox_content_item_left}>2024年2月1日 <img src={CheckIcon} alt=""/></div>
            <img className={style.datebox_content_item_right} src={DeleteIcon} alt=''/>
          </div>
          <div className={style.datebox_content_addLayout}>
            <div className={style.datebox_content_addLayout_left}>新建布局规划</div>
            <img className={style.datebox_content_item_right} src={AddLayout} alt=''/>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default DateSelectType;
