import {
  ActionType,
  PageContainer,
  ProTable,
  ProColumns,
  ProFormInstance,
} from "@ant-design/pro-components";
import React, { useRef, useState } from "react";

import API from "@/services";
import TagsTableRender from "./components/TagsTableRender";
import { Button, Space, message, Input, Popconfirm } from "antd";
import ModalForm from "./components/ModalForm";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
const { queryCategoryList, addCategory, modifyCategory, deleteCategory } =
  API.CategoryController;

/* CURD逻辑封装 */
/**
 * @Description: 新增类别
 */
const handleCategoryAdd = async (categoryInfo: CategoryAPI.CategoryInfo) => {
  const { name, url, labels = [] } = categoryInfo;
  const { code, msg } = await addCategory({
    name,
    url,
    labels: labels.map(({ label }) => label),
  });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 修改类别
 */
const handleCategoryUpdate = async (categoryInfo: CategoryAPI.CategoryInfo) => {
  const { id, name, url, labels = [] } = categoryInfo;
  const { code, msg } = await modifyCategory({
    id,
    name,
    url,
    labels: labels.map(({ label }) => label),
  });
  return { success: code === 200, msg: msg };
};

/**
 * @Description: 删除类别
 */
const handleCategoryDelete = async (categoryInfo: CategoryAPI.CategoryInfo) => {
  const { id } = categoryInfo;
  const { code, msg } = await deleteCategory({
    id,
  });
  return { success: code === 200, msg: msg };
};

const CategoryPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /* 模态框配置 */
  const categoryUpdateModalRef = useRef<ProFormInstance>();
  const categoryModalResetCache = useRef<() => void>();
  const currentCategoryLabels = useRef<CategoryAPI.TagInfo[]>([]);
  const tagUpdateModalRef = useRef<ProFormInstance>();
  const tagModalResetCache = useRef<() => void>();
  const currentTagParentCategory = useRef<CategoryAPI.CategoryInfo>();
  const [categoryCreateModalVisible, handleCategoryCreateModalVisible] =
    useState<boolean>(false);
  const [categoryUpdateModalVisible, handleCategoryUpdateModalVisible] =
    useState<boolean>(false);
  const [tagCreateModalVisible, handleTagCreateModalVisible] =
    useState<boolean>(false);
  const [tagUpdateModalVisible, handleTagUpdateModalVisible] =
    useState<boolean>(false);

  /**
   * @Description: 表单新建类别
   */
  const enterCategoryCreateForm = async (
    category: CategoryAPI.CategoryInfo,
  ) => {
    const { success, msg } = await handleCategoryAdd(category);
    if (success) {
      handleCategoryCreateModalVisible(false);
      actionRef.current!.reload();
      message.success("类别新建成功");
    } else {
      message.error(msg);
    }
  };
  /**
   * @Description: 表单更新类别
   */
  const enterCategoryUpdateForm = async (
    category: CategoryAPI.CategoryInfo,
  ) => {
    category.labels = category.labels ?? currentCategoryLabels.current ?? [];
    const { success, msg } = await handleCategoryUpdate(category);
    if (success) {
      handleCategoryUpdateModalVisible(false);
      actionRef.current!.reload();
      message.success("类别修改成功");
    } else {
      message.error(msg);
    }
  };
  /**
   * @Description: 删除类别
   */
  const deleteCategory = async (category: CategoryAPI.CategoryInfo) => {
    const { success, msg } = await handleCategoryDelete(category);
    if (success) {
      handleCategoryUpdateModalVisible(false);
      actionRef.current!.reload();
      message.success("类别删除成功");
    } else {
      message.error(msg);
    }
  };

  /**
   * @Description: 新增标签
   */
  const enterTagCreateForm = async (tag: CategoryAPI.TagInfo) => {
    // TODO
    tag.category = currentTagParentCategory.current;
    console.log("create", tag);
  };
  /**
   * @Description: 删除标签
   */
  const deleteTag = (tag: CategoryAPI.TagInfo) => {
    // TODO
    console.log("delete", tag);
  };
  /**
   * @Description: 更新标签
   */
  const enterTagUpdateForm = (tag: CategoryAPI.TagInfo) => {
    // TODO
    tag.category = currentTagParentCategory.current;
    console.log("update", tag);
  };

  /* 表格配置 */
  const categoryColumns: ProColumns<CategoryAPI.CategoryInfo>[] = [
    {
      title: "类别ID",
      dataIndex: "id",
      align: "center",
      formItemProps: {
        required: true,
        hidden: categoryCreateModalVisible,
      },
      renderFormItem: (_, { type, value, defaultRender }) => {
        if (type === "form" && value) {
          return <Input value={value} disabled />;
        }
        return defaultRender(_);
      },
    },
    {
      title: "类别名称",
      dataIndex: "name",
      align: "center",
      formItemProps: {
        required: true,
      },
    },
    {
      title: "路由",
      dataIndex: "url",
      align: "center",
      hideInSearch: true,
      formItemProps: {
        required: true,
      },
    },
    {
      title: "标签数",
      dataIndex: "__tags-total",
      align: "center",
      hideInSearch: true,
      render: (_, record) => record.labels.length,
      formItemProps: {
        hidden: true,
      },
    },
    {
      title: "配置",
      dataIndex: "__option",
      valueType: "option",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={async () => {
              currentCategoryLabels.current = record.labels;
              /* 类别-更新模态框数据和重置回调函数 */
              handleCategoryUpdateModalVisible(true);
              setTimeout(() => {
                if (categoryUpdateModalRef.current) {
                  categoryUpdateModalRef.current.setFieldsValue(record);
                  categoryModalResetCache.current = () => {
                    categoryUpdateModalRef.current?.setFieldsValue(record);
                  };
                }
              }, 0);
            }}
          />
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              currentTagParentCategory.current = record;
              handleTagCreateModalVisible(true);
            }}
          />
          <Popconfirm
            title="删除目录"
            description="是否确认删除该目录？"
            onConfirm={() => deleteCategory(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const tagColumns: ProColumns<CategoryAPI.TagInfo>[] = [
    {
      title: "标签ID",
      dataIndex: "id",
      formItemProps: {
        hidden: tagCreateModalVisible,
      },
    },
    {
      title: "标签名",
      dataIndex: "label",
    },
    {
      title: "配置",
      dataIndex: "__option",
      valueType: "option",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={async () => {
              /* 标签-更新模态框数据和重置回调函数 */
              currentTagParentCategory.current = record.category;
              handleTagUpdateModalVisible(true);
              setTimeout(() => {
                if (tagUpdateModalRef.current) {
                  tagUpdateModalRef.current.setFieldsValue(record);
                  tagModalResetCache.current = () => {
                    tagUpdateModalRef.current?.setFieldsValue(record);
                  };
                }
              }, 0);
            }}
          />
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteTag(record)}
          />
        </Space>
      ),
    },
  ];

  /* 渲染内容 */
  return (
    <PageContainer header={{ title: "类别&标签模块" }}>
      {/* 表格 */}
      <ProTable<CategoryAPI.CategoryInfo>
        headerTitle="类别&标签表格"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        columns={categoryColumns}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => {
              handleCategoryCreateModalVisible(true);
            }}
          >
            新建类别
          </Button>,
        ]}
        expandable={{
          expandedRowRender: (_) => TagsTableRender(_, tagColumns),
        }}
        request={async ({ pageSize, current }) => {
          const { data } = await queryCategoryList({
            size: pageSize ?? 10,
            page: current ?? 1,
          });
          /* 特殊处理标签数据，增加父子耦合 */
          data.list.forEach((item) => {
            const _item = {
              ...item,
              labels: [],
            };
            item.labels.forEach((label) => {
              label.category = _item;
            });
            return item;
          });

          return {
            data: data.list,
            success: true,
            total: data.total,
          };
        }}
      ></ProTable>

      {/* 类别新建模态框 */}
      <ModalForm
        title="类别新建信息"
        modalVisible={categoryCreateModalVisible}
        onCancel={() => handleCategoryCreateModalVisible(false)}
      >
        <ProTable<CategoryAPI.CategoryInfo, CategoryAPI.CategoryInfo>
          onSubmit={(v) => enterCategoryCreateForm(v)}
          rowKey="id"
          type="form"
          columns={categoryColumns}
        />
      </ModalForm>

      {/* 类别更新模态框 */}
      <ModalForm
        title="类别更新信息"
        modalVisible={categoryUpdateModalVisible}
        onCancel={() => handleCategoryUpdateModalVisible(false)}
      >
        <ProTable<CategoryAPI.CategoryInfo, CategoryAPI.CategoryInfo>
          onSubmit={(v) => enterCategoryUpdateForm(v)}
          rowKey="id"
          type="form"
          formRef={categoryUpdateModalRef}
          columns={categoryColumns}
          onReset={() =>
            categoryModalResetCache.current && categoryModalResetCache.current()
          }
        />
      </ModalForm>

      {/* 标签新建模态框 */}
      <ModalForm
        title="标签新建信息"
        modalVisible={tagCreateModalVisible}
        onCancel={() => handleTagCreateModalVisible(false)}
      >
        <ProTable<CategoryAPI.TagInfo, CategoryAPI.TagInfo>
          onSubmit={(v) => enterTagCreateForm(v)}
          rowKey="id"
          type="form"
          columns={tagColumns}
        />
      </ModalForm>

      {/* 标签更新模态框 */}
      <ModalForm
        title="标签更新信息"
        modalVisible={tagUpdateModalVisible}
        onCancel={() => handleTagUpdateModalVisible(false)}
      >
        <ProTable<CategoryAPI.TagInfo, CategoryAPI.TagInfo>
          onSubmit={(v) => enterTagUpdateForm(v)}
          rowKey="id"
          type="form"
          formRef={tagUpdateModalRef}
          columns={tagColumns}
          onReset={() =>
            tagModalResetCache.current && tagModalResetCache.current()
          }
        />
      </ModalForm>
    </PageContainer>
  );
};

export default CategoryPage;
