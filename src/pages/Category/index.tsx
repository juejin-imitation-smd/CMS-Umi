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
import { Button, Space } from "antd";
import ModalForm from "./components/ModalForm";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
const { queryCategoryList } = API.CategoryController;

/* CURD逻辑封装 */
/**
 * @Description: 新增类别
 */
const handleCategoryAdd = async (categoryInfo: CategoryAPI.CategoryInfo) => {
  console.log("add", categoryInfo);
};

/**
 * @Description: 修改类别
 */
const handleCategoryUpdate = async (categoryInfo: CategoryAPI.CategoryInfo) => {
  console.log("update", categoryInfo);
};

/**
 * @Description: 删除类别
 */
const handleCategoryDelete = async (categoryInfo: CategoryAPI.CategoryInfo) => {
  console.log("delete", categoryInfo);
};

const CategoryPage: React.FC = () => {
  /* 模态框配置 */
  const categoryUpdateModalRef = useRef<ProFormInstance>();
  const categoryModalResetCache = useRef<() => void>();
  const tagUpdateModalRef = useRef<ProFormInstance>();
  const tagModalResetCache = useRef<() => void>();
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
  const enterCategoryCreateForm = (category: CategoryAPI.CategoryInfo) => {
    // TODO
    handleCategoryAdd(category);
  };
  /**
   * @Description: 表单更新类别
   */
  const enterCategoryUpdateForm = (category: CategoryAPI.CategoryInfo) => {
    // TODO
    handleCategoryUpdate(category);
  };
  /**
   * @Description: 删除类别
   */
  const deleteCategory = (category: CategoryAPI.CategoryInfo) => {
    // TODO
    handleCategoryDelete(category);
  };

  /**
   * @Description: 新增标签
   */
  const enterTagCreateForm = (tag: CategoryAPI.TagInfo) => {
    // TODO
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
    console.log("update", tag);
  };

  /* 表格配置 */
  const actionRef = useRef<ActionType>();
  const categoryColumns: ProColumns<CategoryAPI.CategoryInfo>[] = [
    {
      title: "类别ID",
      dataIndex: "id",
      align: "center",
      formItemProps: {
        hidden: categoryCreateModalVisible,
      },
    },
    {
      title: "类别名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "路由",
      dataIndex: "url",
      align: "center",
      hideInSearch: true,
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
            onClick={() => handleTagCreateModalVisible(true)}
          />
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteCategory(record)}
          />
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
        columns={categoryColumns}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleCategoryCreateModalVisible(true)}
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
          console.log("check", data);
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
