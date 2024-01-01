export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  age: number;
  overall: number;
  target: number;
  description: string;
  avatar: string;
  status: "ACTIVE" | "BLOCKED";
  role: "ADMIN" | "USER";
}
