import { useNavigate } from "@umijs/max";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import {
  ProForm,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import services from "@/services";
import styles from "./index.module.less";

const { register } = services.RegisterController;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const onRegister = async (values: RegisterAPI.RegisterVO) => {
    let { msg } = await register(values);
    message.success(msg + ", 即将跳转到登录页");
    navigate("/login");
  };
  return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <div className={styles.title}>仿掘金首页CMS</div>
        <ProForm
          onFinish={onRegister}
          submitter={{
            searchConfig: {
              submitText: "注册",
            },
            render: () => (
              <Button type="primary" htmlType="submit" style={{ width: 280 }}>
                注册
              </Button>
            ),
          }}
        >
          <ProFormText
            name="user_name"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
            width={280}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
            width={280}
          />
          <ProFormText.Password
            name="repeat_password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder="确认密码"
            rules={[
              {
                required: true,
                message: "请输入确认密码！",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码输入不一致"));
                },
              }),
            ]}
            width={280}
          />
          <div
            style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}
          >
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              返回登录
            </a>
          </div>
        </ProForm>
      </div>
    </ProConfigProvider>
  );
};

export default RegisterPage;
