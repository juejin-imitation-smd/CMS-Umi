import React, { useState, useRef } from "react";
import { Button, Space, Popconfirm, message } from "antd";
import {
  ActionType,
  ProTable,
  ProColumns,
  PageContainer,
} from "@ant-design/pro-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import services from "@/services";

const { queryAdvertisementList, getAdvertisementDetail, deleteAdvertisement } =
  services.AdvertisementController;

/**
 *  删除文章
 * @param selectedRows
 */
const handleRemove = async (articleId: number) => {
  const hide = message.loading("正在删除");
  try {
    await deleteAdvertisement({
      id: articleId,
    });
    hide();
    message.success("删除成功，即将刷新");
    return true;
  } catch (error) {
    hide();
    message.error("删除失败，请重试");
    return false;
  }
};

/**
 * 广告管理页面
 */
const AdvertisementList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const [updateModalValues, setUpdateModalValues] = useState({});
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const column: ProColumns<AdvertisementInfoAPI.AdvertisementInfo>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: true,
      align: "center",
      formItemProps: {},
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      ellipsis: true,
      width: 180,
    },
    {
      title: "内容",
      dataIndex: "content",
      align: "center",
      ellipsis: true,
    },
    {
      title: "封面",
      dataIndex: "image",
      align: "center",
      hideInSearch: true,
      width: 180,
      render: (text, record) => (
        <img
          style={{ width: 60, height: 40 }}
          src={`${text}`}
          alt={record.title}
        />
      ),
    },
    {
      title: "配置",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={async () => {
              const { data } = await getAdvertisementDetail({ id: record.id });
              setUpdateModalValues({ ...data });
              setUpdateModalVisible(true);
            }}
          />
          <Popconfirm
            title="删除此行"
            onConfirm={() => {
              handleRemove(record.id);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <Button danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        header={{
          title: "广告模块",
        }}
      >
        <ProTable<AdvertisementInfoAPI.AdvertisementInfo>
          headerTitle="广告列表"
          actionRef={actionRef}
          rowKey="id"
          columns={column}
          pagination={{
            showSizeChanger: true,
          }}
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
          request={async ({ current, pageSize }) => {
            const { data } = await queryAdvertisementList({
              page: current as number,
              size: pageSize as number,
            });
            return {
              data: data?.list || [],
              success: true,
              total: data?.total,
            };
          }}
          editable={{
            type: "multiple",
          }}
        />
        <CreateForm
          modalVisible={createModalVisible}
          onCancel={() => {
            setCreateModalVisible(false);
          }}
        />
        <UpdateForm
          values={updateModalValues}
          modalVisible={updateModalVisible}
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
        />
      </PageContainer>
    </>
  );
};

export default AdvertisementList;
