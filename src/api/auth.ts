const API_URL = import.meta.env.VITE_API_URL;

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  roles: Role[];
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errorCode: string | null;
  errors: string[];
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterResponse {
  isSuccess: boolean;
  message: string;
}

export interface AuthCredentials {
  email: string;
  password?: string;
}

export const authApi = {
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const result: ApiResponse<AuthResponse> = await response.json();

    if (!response.ok || !result.isSuccess) {
      throw new Error(result.message || 'Error en el inicio de sesión');
    }

    return result.data;
  },

  register: async (credentials: AuthCredentials): Promise<RegisterResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const result: ApiResponse<RegisterResponse> = await response.json();

    if (!response.ok || !result.isSuccess) {
      throw new Error(result.message || 'Error en el registro');
    }

    return (
      result.data || { isSuccess: result.isSuccess, message: result.message }
    );
  },
};
