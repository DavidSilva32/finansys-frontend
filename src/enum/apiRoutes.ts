export class ApiRoutes {
  static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3080";

  static readonly AUTH = {
    LOGIN: `${this.BASE_URL}/auth/login`,
    REGISTER: `${this.BASE_URL}/auth/register`,
    REFRESH: `${this.BASE_URL}/auth/refresh`,
  };
}
