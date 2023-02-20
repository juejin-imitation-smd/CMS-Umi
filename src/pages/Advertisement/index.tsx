import React, { useRef } from "react";
import { useNavigate } from "@umijs/max";
import dayjs from "dayjs";
import { Button, Space, Popconfirm, message } from "antd";
import {
  ActionType,
  ProTable,
  ProColumns,
  PageContainer,
} from "@ant-design/pro-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import services from "@/services";

const { queryAdvertisementList, deleteAdvertisement } =
  services.AdvertisementController;

/**
 *  删除广告
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
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();
  const column: ProColumns<AdvertisementInfoAPI.AdvertisementInfo>[] = [
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
      render: (_, record) => dayjs(+record.time).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "封面",
      dataIndex: "image",
      align: "center",
      hideInSearch: true,
      width: 160,
      render: (text, record) =>
        text === "-" ? (
          "-"
        ) : (
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
      render: (_, record) => record.author.username,
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
              navigate(`/advertisement/edit/${record.id}`);
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
          scroll={{ x: 1300 }}
          pagination={{
            showSizeChanger: true,
          }}
          toolBarRender={() => [
            <Button
              key="1"
              type="primary"
              onClick={() => {
                navigate("/advertisement/add");
              }}
            >
              新建
            </Button>,
          ]}
          request={async ({ current, pageSize, title = "" }) => {
            const { data } = await queryAdvertisementList({
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
    </>
  );
};

export default AdvertisementList;
