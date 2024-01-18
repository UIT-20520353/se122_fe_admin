export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  age: number;
  description: string;
  avatar: string;
  status: "ACTIVE" | "BLOCKED";
  role: "ADMIN" | "USER";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ENTRY_TEST";
}

export interface UserDetail {
  key: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: string;
  age: number;
  description: string;
  avatar: string;
  status: "ACTIVE" | "BLOCKED";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ENTRY_TEST";
  posts: Post[];
}

export interface Post {
  key: string;
  id: number;
  name: string;
  url: string;
  createdDate: string;
  status: "VALID" | "INVALID" | "PENDING";
  duration: number;
}
