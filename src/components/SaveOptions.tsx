import React from 'react';
import {Button, Space} from "antd";
import {BarChartOutlined, SaveOutlined, SyncOutlined} from "@ant-design/icons";
import {getGlobalAllValue, getGlobalValue} from "@/plugin/useGlobalState";

const SaveOptions = () => {
  const handleSave = ()=>{
    console.log("!23123131====>",getGlobalAllValue())
  }
  return (
    <Space>
      <Button icon={<BarChartOutlined />}>查看店铺数据</Button>
      <Button type='primary' icon={<SyncOutlined />}>发布</Button>
      <Button type='primary' onClick={handleSave} icon={<SaveOutlined />}>保存</Button>
    </Space>
  );
};

export default SaveOptions;
