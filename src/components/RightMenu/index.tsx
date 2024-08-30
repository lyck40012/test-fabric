import React, {useContext, useEffect, useState} from 'react';
import style from  './index.less'
import   { fabric }  from 'fabric'
import {CanvasContext} from "@/pages/TableList";
let activeEl:any = null
const RightMenu = () => {
  const { canvas } = useContext(CanvasContext)
  const [menuPosition, setMenuPosition] = useState<any>();
  useEffect(() => {
    if(canvas){
      canvas.on('mouse:down', canvasOnMouseDown);
    }
    setMenuPosition(document.getElementById('rightMenu'))
  }, [canvas]);
  // 隐藏菜单
  const hiddenMenu = ()=> {
    menuPosition.style = `
      visibility: hidden;
      left: 0;
      top: 0;
      z-index: -100;
    `;
    activeEl = null;
  }
  const  canvasOnMouseDown  = (opt:any)=>{
    if(opt.button === 3 && opt.target&&opt.target.id!=="workspace"){
      const menuWidth = menuPosition.offsetWidth;
      const menuHeight = menuPosition.offsetHeight;
      activeEl = opt.target;
      let pointX = opt.pointer.x;
      let pointY = opt.pointer.y;
      // 计算菜单出现的位置
      // 如果鼠标靠近画布右侧，菜单就出现在鼠标指针左侧
      if (canvas.width - pointX <= menuWidth) {
        pointX -= menuWidth;
      }
      // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
      if (canvas.height - pointY <= menuHeight) {
        pointY -= menuHeight;
      }
      menuPosition.style = `
        visibility: visible;
        left: ${pointX}px;
        top: ${pointY}px;
        z-index: 100;
      `;
    }else {
      hiddenMenu()
    }
  }
  const handleDelete = ()=>{
    canvas.remove(activeEl);
    hiddenMenu();
  }
  const handleCopy = ()=>{
    if (activeEl) {
      activeEl.clone((cloned: any) => {
        cloned.set({
          left: cloned.left + 20,
          top: cloned.top + 20
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
      })
    }
    hiddenMenu();
  }
  return (
    <div className={style.rightMenu} id='rightMenu'>
      <div className={style.rightMenu_item} onClick={handleDelete}>删除</div>
      <div className={style.rightMenu_item} onClick={handleCopy}>复制</div>
    </div>
  );
};

export default RightMenu;
