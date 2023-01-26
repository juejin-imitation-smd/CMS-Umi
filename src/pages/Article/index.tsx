import React, { useState, useRef } from "react";
import { Button, Space, Tag, Popconfirm, message } from "antd";
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

const { queryArticleList, getArticleDetail, deleteArticle } =
  services.ArticleController;

/**
 *  删除文章
 * @param selectedRows
 */
const handleRemove = async (articleId: number) => {
  const hide = message.loading("正在删除");
  try {
    await deleteArticle({
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
 * 文章管理页面
 */
const ArticleList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const [updateModalValues, setUpdateModalValues] = useState({});
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const column: ProColumns<ArticleAPI.ArticleInfo>[] = [
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
      width: 140,
    },
    {
      title: "时间",
      dataIndex: "time",
      align: "center",
      ellipsis: true,
      hideInSearch: true,
      width: 160,
    },
    {
      title: "分类",
      dataIndex: "label",
      align: "center",
      hideInSearch: true,
      width: 120,
    },
    {
      title: "标签",
      dataIndex: "sub_tabs",
      align: "center",
      hideInSearch: true,
      width: 200,
      render: (_, record) =>
        record.sub_tabs?.map((item: string) => (
          <Tag key={item} color="cyan">
            {item}
          </Tag>
        )),
    },
    {
      title: "内容",
      dataIndex: "content",
      align: "center",
      ellipsis: true,
      hideInSearch: true,
      width: 240,
    },
    {
      title: "封面",
      dataIndex: "image",
      align: "center",
      hideInSearch: true,
      width: 160,
      render: (text, record) => (
        <img
          style={{ width: 60, height: 40 }}
          src={`${text}`}
          alt={record.title}
        />
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
      align: "center",
      hideInSearch: true,
      width: 180,
    },
    {
      title: "阅读数",
      dataIndex: "view_count",
      align: "center",
      hideInSearch: true,
      width: 90,
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      align: "center",
      hideInSearch: true,
      width: 90,
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      align: "center",
      hideInSearch: true,
      width: 90,
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
              const { data } = await getArticleDetail({ id: record.id });
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
    <PageContainer
      header={{
        title: "文章模块",
      }}
    >
      <ProTable<ArticleAPI.ArticleInfo>
        headerTitle="文章列表"
        actionRef={actionRef}
        rowKey="id"
        columns={column}
        scroll={{ x: 1300 }}
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
          const { data } = await queryArticleList({
            page: current as number,
            size: pageSize as number,
          });
          return {
            data: data?.list || [],
            success: true,
            total: data?.total,
          };
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
  );
};

export default ArticleList;
