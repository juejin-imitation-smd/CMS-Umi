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

declare namespace RegisterAPI {
  interface Result_RegisterInfo {
    code: number;
    msg: string;
    data: null;
  }
  interface RegisterVO {
    user_name: string;
    password: string;
    repeat_password: string;
  }
}
