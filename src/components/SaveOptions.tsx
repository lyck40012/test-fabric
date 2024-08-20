import React from 'react';
import {Button, Space} from "antd";
import {SaveOutlined, SyncOutlined} from "@ant-design/icons";

const SaveOptions = () => {
  return (
    <Space>
      <Button type='primary' icon={<SyncOutlined />}>发布</Button>
      <Button type='primary' icon={<SaveOutlined />}>保存</Button>
    </Space>
  );
};

export default SaveOptions;
