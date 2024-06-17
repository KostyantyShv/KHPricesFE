export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  confirmPassword?: string;
}
