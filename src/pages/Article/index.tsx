import React, { useRef } from "react";
import { useNavigate } from "@umijs/max";
import { DefaultOptionType } from "antd/es/select";
import { formatTime } from "@/utils/format";
import { Button, Space, Tag, Popconfirm, message } from "antd";
import {
  ActionType,
  ProTable,
  ProColumns,
  PageContainer,
} from "@ant-design/pro-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import services from "@/services";

const { queryArticleList, queryLabel, deleteArticle } =
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
 *  获取文章标签和类型
 * @param selectedRows
 */
export const getLabelAndSubTab = async () => {
  const {
    data: { list },
  } = await queryLabel();
  const labelOptions: DefaultOptionType[] = [];
  list.forEach(({ name, labels }) => {
    labelOptions.push({ label: name, value: name, labels });
  });
  return labelOptions;
};

/**
 * @Description: 文章管理页面
 */
const ArticleList: React.FC<unknown> = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();
  const column: ProColumns<ArticleAPI.ArticleInfo>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: true,
      hideInSearch: true,
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
      render: (_, record) => formatTime(+record.time),
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
              navigate(`/article/edit/${record.id}`);
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
              navigate("/article/add");
            }}
          >
            新建
          </Button>,
        ]}
        request={async ({ current, pageSize, title = "" }) => {
          const { data } = await queryArticleList({
            page: current as number,
            size: pageSize as number,
            title,
          });
          return {
            data: data?.list || [],
            success: true,
            total: data?.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default ArticleList;
