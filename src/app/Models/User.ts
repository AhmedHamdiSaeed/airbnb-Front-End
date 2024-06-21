export interface userRegister {
  email: string;
  password: string;
  firstName: string;
  confirmpassword: string;
  lastName: string;
  role: number;
}
export interface userLogin {
  email: string;
  password: string;
}

export interface userToken {
  token: string;
  role: string;
  userName: string;
  expiration: string;
}
