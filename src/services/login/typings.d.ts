declare namespace LoginAPI {
  interface Result_LoginInfo {
    code: number;
    msg: string;
    data: LoginInfo;
  }
  interface LoginInfo {
    id: number;
    user_name: string;
    createAt: string;
  }
  interface LoginInfoVO {
    user_name: string;
    password: string;
  }
}
