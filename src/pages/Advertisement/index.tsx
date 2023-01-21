import React, { useState, useEffect, useRef } from "react";
import {
  ProTable,
  ProColumns,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Button } from "antd";
import CreateForm from "./components/CreateForm";
import services from "@/services";

const { getAdvertisements } = services.AdvertisementController;

/**
 * 广告管理页面
 */
const AdvertisementList: React.FC<unknown> = () => {
  const ref = useRef<ProFormInstance>();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<
    AdvertisementInfoAPI.AdvertisementInfo[]
  >([]);
  const column: ProColumns<AdvertisementInfoAPI.AdvertisementInfo>[] = [
    {
      title: "标题",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      ellipsis: true,
    },
    {
      title: "图片",
      dataIndex: "image",
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a key="view">查看</a>,
      ],
    },
  ];

  useEffect(() => {
    (async function () {
      const res = await getAdvertisements({ page: 1, size: 10, query: {} });
      const { data } = res;
      setDataSource(data.list);
    })();
  }, []);

  return (
    <>
      <ProTable<AdvertisementInfoAPI.AdvertisementInfo>
        headerTitle="查询广告列表"
        rowKey="id"
        formRef={ref}
        columns={column}
        dataSource={dataSource}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
        editable={{
          type: "multiple",
        }}
        // request={handleQuery}
      />
      <CreateForm
        modalVisible={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
    </>
  );
};

export default AdvertisementList;
