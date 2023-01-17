import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "@umijs/max";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/home");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button onClick={backHome} type="primary">
          返回首页
        </Button>
      }
    />
  );
};

export default NotFoundPage;
