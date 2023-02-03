import React, { useState } from "react";
import { useNavigate, useParams } from "@umijs/max";
import dayjs from "dayjs";
import { Rule } from "antd/es/form";
import type { UploadFile } from "antd/es/upload/interface";
import { getAuthors } from "@/pages/Article/index";
import { Button, message } from "antd";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormUploadButton,
  ProFormDateTimePicker,
} from "@ant-design/pro-components";
import { MdEditor } from "@/components/MdRender";
import services from "@/services";
import style from "./index.module.less";

const { modifyAdvertisement, getAdvertisementDetail } =
  services.AdvertisementController;
const { uploadFile } = services.FileController;

const authorOption = await getAuthors();

const rules: Rule[] = [{ required: true }];

const EditArticle: React.FC = () => {
  const navigate = useNavigate();
  const { id = "0" } = useParams();
  const [form] = ProForm.useForm();
  const [content, setContent] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      let image = "";
      if (fileList.length > 0) {
        if (fileList[0] instanceof File) {
          const { data } = await uploadFile(fileList[0]);
          image = data.path;
        } else {
          image = fileList[0].url || "";
        }
      }
      const body = {
        ...values,
        id: +id,
        content,
        image,
        time: +values.time.format("x"),
      };
      await modifyAdvertisement(body);
      message.success("提交成功");
      navigate("/advertisement");
    });
  };

  return (
    <PageContainer
      header={{
        title: "编辑广告信息",
        extra: [
          <Button
            key="1"
            onClick={() => {
              navigate("/advertisement");
            }}
          >
            返回
          </Button>,
        ],
      }}
      content={
        <ProForm
          form={form}
          grid
          submitter={{ render: () => null }}
          request={async () => {
            const {
              data: { advertisement },
            } = await getAdvertisementDetail({ id: +id });
            setContent(advertisement.content);
            if (advertisement.image) {
              setFileList([
                {
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: advertisement.image,
                },
              ]);
            }
            return {
              ...advertisement,
              author_id: advertisement.author.id,
              time: dayjs(+advertisement.time).format("YYYY-MM-DD hh:mm:ss"),
            };
          }}
        >
          <ProFormText
            colProps={{ md: 12, xl: 12 }}
            label="标题"
            name="title"
            rules={rules}
          />
          <ProFormSelect
            colProps={{ md: 12, xl: 12 }}
            label="作者"
            name="author_id"
            rules={rules}
            fieldProps={{
              options: authorOption,
            }}
          />
          <ProFormUploadButton
            title="选择封面"
            max={1}
            fieldProps={{
              fileList: fileList,
              listType: "picture-card",
              beforeUpload(file, list) {
                const isJpgOrPng =
                  file.type === "image/jpeg" || file.type === "image/png";
                if (!isJpgOrPng) {
                  message.error("请选择 JPG/PNG 格式的文件!");
                  return false;
                }
                setFileList(list);
                return false;
              },
              onRemove() {
                setFileList([]);
              },
            }}
          />
          <ProFormDigit
            colProps={{ md: 12, xl: 6 }}
            label="阅读数"
            name="view_count"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={rules}
          />
          <ProFormDigit
            colProps={{ md: 12, xl: 6 }}
            label="点赞数"
            name="like_count"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={rules}
          />
          <ProFormDigit
            colProps={{ md: 12, xl: 6 }}
            label="评论数"
            name="comment_count"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={rules}
          />
          <ProFormDateTimePicker
            colProps={{ md: 12, xl: 6 }}
            label="发布时间"
            name="time"
            rules={rules}
            fieldProps={{
              format: (value) => value.format("YYYY-MM-DD hh:mm:ss"),
            }}
          />
        </ProForm>
      }
    >
      <div className={style.content} style={{ paddingBottom: 10 }}>
        文章内容
      </div>
      <MdEditor
        value={content}
        onChange={(v) => {
          setContent(v);
        }}
      />
      <Button type="primary" onClick={onSubmit} style={{ marginTop: 10 }}>
        提交
      </Button>
    </PageContainer>
  );
};

export default EditArticle;
