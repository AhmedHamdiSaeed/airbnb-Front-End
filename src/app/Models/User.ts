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
export interface userProfile {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  image: string;
}
export interface currentUserModel {
  displayName: string;
  image: string;
  email: string;
  token: string;
}
