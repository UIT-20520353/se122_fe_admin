export interface MessageResponse {
  id: number;
  userId: number;
  type: string;
  message: string;
  date: string;
}

export interface MessageRequest {
  message: string;
  type: "JOIN" | "MESSAGE" | "LEAVE";
  token: string;
}
