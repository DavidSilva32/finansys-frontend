export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserPayload {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  payload: T | null;
  message: string;
  status: number;
}
