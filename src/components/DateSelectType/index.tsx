import { Radio } from 'antd';
import React from 'react';
import  style from './index.less';
const DateSelectType = () => {
  return (
    <div className={style.dateSelectType}>
      <Radio.Group defaultValue="a" buttonStyle="solid" >
        <Radio.Button value="a">周次</Radio.Button>
        <Radio.Button value="b">月次</Radio.Button>
        <Radio.Button value="c">标准</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default DateSelectType;
