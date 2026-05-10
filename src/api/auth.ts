const API_URL = import.meta.env.VITE_API_URL;

export interface AuthResponse {
  accessToken: string;
}

export interface RegisterResponse {
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el inicio de sesión');
    }

    return response.json();
  },

  register: async (credentials: AuthCredentials): Promise<RegisterResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el registro');
    }

    return response.json();
  },
};
