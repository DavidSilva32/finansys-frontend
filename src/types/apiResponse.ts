export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: Pick<User, "id" | "email">;
  tokens: Tokens;
}

export interface RegisterResponse {
  user: User;
  tokens: Tokens;
}

export interface RefreshResponse {
  tokens: Tokens;
}

export interface ApiResponse<T> {
  payload: T | null;
  message: string;
  status: number;
}
