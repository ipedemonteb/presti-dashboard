// DTOs de autenticación
export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  nombre: string;
  email: string;
  password: string;
}

// La API solo retorna el access_token
export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
}

// Respuesta de error de la API
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
