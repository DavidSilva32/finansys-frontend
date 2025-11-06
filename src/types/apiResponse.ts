export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: Pick<User, 'id' | 'email'>;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  payload: T | null;
  message: string;
  status: number;
}
