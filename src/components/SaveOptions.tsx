import React, {useContext} from 'react';
import {Button, Space} from "antd";
import {BarChartOutlined, SaveOutlined, SyncOutlined} from "@ant-design/icons";
import {getGlobalAllValue} from "@/plugin/useGlobalState";
import {downFile} from "@/utils/utils";
import {CanvasContext} from "@/pages/TableList";

const SaveOptions = () => {
  const  { canvas } = useContext(CanvasContext);
  const handleSave = ()=>{
    const  dataUrl  = canvas.toJSON([
      'id',
      'gradientAngle',
      'selectable',
      'hasControls',
      'linkData',
      'editable',
      'extensionType',
      'extension',
      'verticalAlign',
      'roundValue',
    ])
    const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, '\t')
    )}`;
    downFile('测试JSON',fileStr, 'json');
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
