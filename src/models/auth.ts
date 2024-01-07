export interface LoginResponseModel {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface RegisterRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  gender: number;
  age: number;
}

export interface UserProfileModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  gender: string;
  age: number;
  overall: number;
  target: number;
  description: string;
  avatar: string;
}
