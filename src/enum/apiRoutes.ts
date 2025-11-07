export class ApiRoutes {
  static readonly BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://localhost:3080";

  static readonly AUTH = {
    LOGIN: `${this.BASE_URL}/auth/login`,
    REGISTER: `${this.BASE_URL}/auth/register`,
    REFRESH: `${this.BASE_URL}/auth/refresh`,
  };

  static readonly TRANSACTIONS = {
    CREATE: `${this.BASE_URL}/transactions/create`,
    LIST: `${this.BASE_URL}/transactions/list`,
    GET: (id: string) => `${this.BASE_URL}/transactions/${id}`,
    UPDATE: (id: string) => `${this.BASE_URL}/transactions/${id}`,
    DELETE: (id: string) => `${this.BASE_URL}/transactions/${id}`,
  };
}
