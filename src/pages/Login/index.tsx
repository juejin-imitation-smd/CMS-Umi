import { useNavigate } from "@umijs/max";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import services from "@/services";
import styles from "./index.module.less";

const { login } = services.LoginController;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const onLogin = async (values: LoginAPI.LoginInfoVO) => {
    let { msg, data } = await login(values);
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    message.success(msg);
    navigate("/");
  };
  return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <LoginForm
          logo="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg"
          title="仿掘金首页CMS"
          subTitle="仿掘金首页后台管理系统"
          onFinish={onLogin}
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
          />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
              onClick={() => {
                // navigate("/register");
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default LoginPage;
