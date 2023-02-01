import React, { useRef, useState } from "react";
import {
  ActionType,
  PageContainer,
  ProTable,
  ProColumns,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Button, Space, Input, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import ModalForm from "./components/ModalForm";

import API from "@/services";
const { queryRouteList, addRoute, modifyRoute, deleteRoute } =
  API.RouteController;

/* CURD逻辑封装 */
/**
 * @Description: 新增类别
 */
const handleRouteAdd = async (routeInfo: RouteAPI.RouteInfo) => {
  const { name, url, label } = routeInfo;
  const { code, msg } = await addRoute({ name, url, label });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 修改类别
 */
const handleRouteUpdate = async (routeInfo: RouteAPI.RouteInfo) => {
  const { id, name, url, label } = routeInfo;
  const { code, msg } = await modifyRoute({ id, name, url, label });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 删除类别
 */
const handleRouteDelete = async (routeInfo: RouteAPI.RouteInfo) => {
  const { id } = routeInfo;
  const { code, msg } = await deleteRoute({
    id,
  });
  return { success: code === 200, msg: msg };
};

const RoutePage = () => {
  const actionRef = useRef<ActionType>();

  /* 模态框 */
  const updateModalRef = useRef<ProFormInstance>();
  const modalResetCache = useRef<() => void>();
  const [createModalVisible, handleCreateModalVisible] =
    useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);

  /**
   * @Description: 表单更新路由
   */
  const enterUpdateForm = async (route: RouteAPI.RouteInfo) => {
    const { success, msg } = await handleRouteUpdate(route);
    if (success) {
      handleUpdateModalVisible(false);
      actionRef.current!.reload();
      message.success("修改成功");
    } else {
      message.error(msg);
    }
  };

  /* editModal-新建作者 */
  const enterCreateForm = async (route: RouteAPI.RouteInfo) => {
    const { success, msg } = await handleRouteAdd(route);
    if (success) {
      handleCreateModalVisible(false);
      actionRef.current!.reload();
      message.success("新建成功");
    } else {
      message.error(msg);
    }
  };

  /* table-删除表单个例 */
  const deleteRoute = async (route: RouteAPI.RouteInfo) => {
    const { success, msg } = await handleRouteDelete(route);
    if (success) {
      handleCreateModalVisible(false);
      actionRef.current!.reload();
      message.success("删除成功");
    } else {
      message.error(msg);
    }
  };

  /* 表格列表配置 */
  const columns: ProColumns<RouteAPI.RouteInfo>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: true,
      align: "center",
      hideInSearch: true,
      formItemProps: {
        hidden: createModalVisible,
      },
      renderFormItem: (_, { type, value, defaultRender }) => {
        if (type === "form" && value) {
          return <Input value={value} disabled />;
        }
        return defaultRender(_);
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      ellipsis: true,
      width: 120,
      align: "center",
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
          },
        ],
      },
    },
    {
      title: "链接",
      dataIndex: "url",
      ellipsis: true,
      width: 120,
      align: "center",
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
          },
        ],
      },
    },
    {
      title: "标记",
      dataIndex: "label",
      hideInSearch: true,
      width: 80,
      align: "center",
    },
    {
      title: "配置",
      dataIndex: "option",
      valueType: "option",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={async () => {
              /* 更新模态框数据和重置回调函数 */
              handleUpdateModalVisible(true);
              setTimeout(() => {
                if (updateModalRef.current) {
                  updateModalRef.current.setFieldsValue(record);
                  modalResetCache.current = () => {
                    updateModalRef.current?.setFieldsValue(record);
                  };
                }
              }, 0);
            }}
          />
          <Popconfirm
            title="删除路由"
            description="是否确认删除该路由？"
            onConfirm={() => deleteRoute(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /* 渲染内容 */
  return (
    <PageContainer
      header={{
        title: "路由模块",
      }}
    >
      {/* 表格 */}
      <ProTable<RouteAPI.RouteInfo>
        headerTitle="路由表格"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async () => {
          const { data } = await queryRouteList();
          console.log("check", data);
          return {
            data: data.list,
            success: true,
          };
        }}
      ></ProTable>

      {/* 新建模态框 */}
      <ModalForm
        title="路由新建信息"
        modalVisible={createModalVisible}
        onCancel={() => handleCreateModalVisible(false)}
      >
        <ProTable<RouteAPI.RouteInfo, RouteAPI.RouteInfo>
          onSubmit={(v) => enterCreateForm(v)}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </ModalForm>

      {/* 更新模态框 */}
      <ModalForm
        title="路由更新信息"
        modalVisible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false)}
      >
        <ProTable<RouteAPI.RouteInfo, RouteAPI.RouteInfo>
          onSubmit={(v) => enterUpdateForm(v)}
          rowKey="id"
          type="form"
          formRef={updateModalRef}
          columns={columns}
          onReset={() => modalResetCache.current && modalResetCache.current()}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default RoutePage;
