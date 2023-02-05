import { Navigate, Outlet } from "@umijs/max";

/* 登录鉴权 */
export default () => {
  const userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
