import React, { useRef, useState } from "react";
import {
  ActionType,
  PageContainer,
  ProTable,
  ProColumns,
  FooterToolbar,
  ProFormInstance,
} from "@ant-design/pro-components";
import {
  addAuthor,
  deleteAuthor,
  modifyAuthor,
  queryAuthorList,
} from "@/services/author/AuthorController";
import { Button, Space, Avatar, Input, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditForm from "./components/EditForm";
import UpdateForm from "./components/UpdateForm";

/* CURD逻辑封装 */
/**
 * @Description: 新增作者
 */
const handleAuthorAdd = async (authorInfo: AuthorAPI.AuthorInfo) => {
  const { username, description, avatar, article_count = 0 } = authorInfo;
  const { code, msg } = await addAuthor({
    username,
    description,
    avatar,
    article_count,
  });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 更新作者
 */
const handleAuthorUpdate = async (authorInfo: AuthorAPI.AuthorInfo) => {
  const { id, username, description, avatar, article_count } = authorInfo;
  const { code, msg } = await modifyAuthor({
    username,
    description,
    avatar,
    article_count,
    id,
  });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 删除作者
 */
const handleAuthorDelete = async (authorInfo: AuthorAPI.AuthorInfo) => {
  const { id } = authorInfo;
  const { code, msg } = await deleteAuthor({
    id,
  });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 批量删除
 */
const handleBatchAuthorDelete = async (
  authorInfoList: AuthorAPI.AuthorInfo[],
) => {
  const reqList = authorInfoList.map(({ id }) => deleteAuthor({ id }));
  const resList = await Promise.all(reqList);
  const index = resList.findIndex((res) => res.code !== 200);
  return index === -1
    ? { success: true, msg: resList[0].msg }
    : { success: false, msg: resList[index].msg };
};

const AuthorPage: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<AuthorAPI.AuthorInfo[]>(
    [],
  );

  /* 模态框 */
  const updateModalRef = useRef<ProFormInstance>();
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const handleUpdateModalResetCache = useRef<() => void>();

  /* updateModal-初始化模态框数据 */
  const handleUpdateModalOpen = async (record: AuthorAPI.AuthorInfo) => {
    handleUpdateModalVisible(true);
    setTimeout(() => {
      if (updateModalRef.current) {
        updateModalRef.current.setFieldsValue(record);
        handleUpdateModalResetCache.current = () => {
          updateModalRef.current?.setFieldsValue(record);
        };
      }
    }, 0);
  };

  /* updateModal-保存模态框数据修改 */
  const handleUpdateModalSave = async (author: AuthorAPI.AuthorInfo) => {
    const { success, msg } = await handleAuthorUpdate(author);
    if (success) {
      handleUpdateModalVisible(false);
      actionRef.current!.reload();
      message.success("修改成功");
    } else {
      message.error(msg);
    }
  };

  /* editModal-新建作者 */
  const handleEditFromEnter = async (author: AuthorAPI.AuthorInfo) => {
    const { success, msg } = await handleAuthorAdd(author);
    if (success) {
      handleEditModalVisible(false);
      actionRef.current!.reload();
      message.success("新建成功");
    } else {
      message.error(msg);
    }
  };

  /* table-删除表单个例 */
  const handleTableDeleteSimgleItem = async (author: AuthorAPI.AuthorInfo) => {
    const { success, msg } = await handleAuthorDelete(author);
    if (success) {
      handleEditModalVisible(false);
      actionRef.current!.reload();
      message.success("删除成功");
    } else {
      message.error(msg);
    }
  };

  /* table-删除表单所选 */
  const handleTableDeleteSelected = async () => {
    const selection = selectedRowsState;
    if (selection.length === 0) {
      message.error("选项不可为空");
      return;
    }
    const { success, msg } = await handleBatchAuthorDelete(selection);
    if (success) {
      actionRef.current!.reload();
      message.success("批量删除成功");
    } else {
      message.error(msg);
    }
  };

  /* 表格列表配置 */
  const columns: ProColumns<AuthorAPI.AuthorInfo>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: true,
      align: "center",
      formItemProps: {
        hidden: editModalVisible,
      },
      renderFormItem: (_, { type, value, defaultRender }) => {
        if (type === "form" && value) {
          return <Input value={value} disabled />;
        }
        return defaultRender(_);
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
      ellipsis: true,
      width: 120,
      align: "center",
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
      title: "头像",
      dataIndex: "avatar",
      valueType: "image",
      render: (_, record) => (
        <Avatar size={40} shape="square" src={record.avatar} />
      ),
      hideInSearch: true,
      width: 60,
      align: "center",
    },
    {
      title: "文章数",
      dataIndex: "article_count",
      hideInSearch: true,
      width: 80,
      align: "center",
      formItemProps: {
        hidden: true,
      },
    },
    {
      title: "描述",
      dataIndex: "description",
      hideInSearch: true,
      width: 400,
      ellipsis: true,
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
            onClick={() => handleUpdateModalOpen(record)}
          />
          <Popconfirm
            title="删除作者"
            description="是否确认删除该作者？"
            onConfirm={() => handleTableDeleteSimgleItem(record)}
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
        title: "作者模块",
      }}
    >
      {/* 表格 */}
      <ProTable<AuthorAPI.AuthorInfo>
        headerTitle="作者表格"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        scroll={{ x: 100 }}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleEditModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        request={async (params) => {
          const { data } = await queryAuthorList({
            size: params.pageSize ?? 1,
            page: params.current ?? 1,
            username: params.username ?? "",
          });
          console.log("check", data);
          return {
            data: data.list,
            success: true,
            total: data.total,
          };
        }}
      ></ProTable>

      {/* 底部选择栏 */}
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{" "}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{" "}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button danger onClick={() => handleTableDeleteSelected()}>
            批量删除
          </Button>
        </FooterToolbar>
      )}

      {/* 编辑框 */}
      <EditForm
        modalVisible={editModalVisible}
        onCancel={() => handleEditModalVisible(false)}
      >
        <ProTable<AuthorAPI.AuthorInfo, AuthorAPI.AuthorInfo>
          onSubmit={(v) => handleEditFromEnter(v)}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </EditForm>

      <UpdateForm
        modalVisible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false)}
      >
        <ProTable<AuthorAPI.AuthorInfo, AuthorAPI.AuthorInfo>
          onSubmit={(v) => handleUpdateModalSave(v)}
          rowKey="id"
          type="form"
          formRef={updateModalRef}
          columns={columns}
          onReset={() =>
            handleUpdateModalResetCache.current &&
            handleUpdateModalResetCache.current()
          }
        />
      </UpdateForm>
    </PageContainer>
  );
};

export default AuthorPage;
