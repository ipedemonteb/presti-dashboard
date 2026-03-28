import { api } from "@/lib/api";
import type { LoginDto, SignupDto, AuthResponse } from "@/types/auth";

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/v1/auth/login",
      credentials
    );
    return response.data;
  },

  async signup(data: SignupDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/v1/auth/signup", data);
    return response.data;
  },

  logout() {
    localStorage.removeItem("presti-auth-token");
    localStorage.removeItem("presti-user");
  },

  getToken(): string | null {
    return localStorage.getItem("presti-auth-token");
  },

  setToken(token: string): void {
    localStorage.setItem("presti-auth-token", token);
  },

  getUser(): string | null {
    return localStorage.getItem("presti-user");
  },

  setUser(user: string): void {
    localStorage.setItem("presti-user", user);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
