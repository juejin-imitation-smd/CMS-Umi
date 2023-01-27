import React from "react";
import { ProTable, ProColumns } from "@ant-design/pro-components";

const TagsTableRender = (
  record: CategoryAPI.CategoryInfo,
  tagColumns: ProColumns<CategoryAPI.TagInfo>[],
) => {
  const dataSource = record.labels.map((item) => ({
    ...item,
    category: record,
  }));

  /* 渲染内容 */
  return (
    <ProTable
      headerTitle={false}
      rowKey="id"
      search={false}
      columns={tagColumns}
      options={false}
      dataSource={dataSource}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 50],
      }}
    />
  );
};

export default TagsTableRender;
