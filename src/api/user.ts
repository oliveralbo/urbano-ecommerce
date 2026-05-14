import type { ApiResponse, User } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

export interface AssignRoleDto {
  userId: number;
  roleId: number;
}

export const userApi = {
  getUsers: async (token: string): Promise<User[]> => {
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result: ApiResponse<User[]> = await response.json();

    if (!response.ok || !result.isSuccess) {
      throw new Error(result.message || 'Error al obtener usuarios');
    }

    return result.data;
  },

  assignRole: async (token: string, data: AssignRoleDto): Promise<User> => {
    const response = await fetch(`${API_URL}/role/assign`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<User> = await response.json();

    if (!response.ok || !result.isSuccess) {
      throw new Error(result.message || 'Error al asignar rol');
    }

    return result.data;
  },
};
