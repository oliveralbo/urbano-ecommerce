import type { ApiResponse } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title?: string;
  code?: string;
  categoryId: number;
  description?: string;
  about?: string[];
  variationType?: string;
  isActive: boolean;
}

export interface CreateProductDto {
  categoryId: number;
}

export type CapacityUnit = 'GB' | 'TB';
export type CapacityType = 'SSD' | 'HD';
export type VariationType = 'NONE' | 'OnlySize' | 'OnlyColor' | 'SizeAndColor';

export interface ProductBase {
  title: string;
  code: string;
  description: string;
  variationType: VariationType;
}

export interface ProductForm extends ProductBase {
  categoryId: string;
  about: string;
}

export interface ComputerDetails {
  category: 'Computers';
  brand: string;
  series: string;
  capacity: number;
  capacityUnit: CapacityUnit;
  capacityType: CapacityType;
}

export interface GenericDetails {
  category: string;
}

export type ProductDetails = ComputerDetails | GenericDetails;

export interface ProductDetailsDto extends ProductBase {
  about: string[];
  details: ProductDetails;
}

export const inventoryApi = {
  getCategories: async (token: string): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const result: ApiResponse<Category[]> = await response.json();
    if (!response.ok || !result.isSuccess)
      throw new Error(result.message || 'Error al cargar categorías');
    return result.data;
  },

  createProduct: async (
    token: string,
    data: CreateProductDto,
  ): Promise<Product> => {
    const response = await fetch(`${API_URL}/product/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result: ApiResponse<Product> = await response.json();
    if (!response.ok || !result.isSuccess)
      throw new Error(
        result.message || 'Error al iniciar creación del producto',
      );
    return result.data;
  },

  updateDetails: async (
    token: string,
    id: number,
    details: ProductDetailsDto,
  ): Promise<Product> => {
    const response = await fetch(`${API_URL}/product/${id}/details`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
    const result: ApiResponse<Product> = await response.json();
    if (!response.ok || !result.isSuccess)
      throw new Error(
        result.message || 'Error al cargar detalles del producto',
      );
    return result.data;
  },

  activateProduct: async (token: string, id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/product/${id}/activate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const result: ApiResponse<Product> = await response.json();
    if (!response.ok || !result.isSuccess)
      throw new Error(result.message || 'Error al activar producto');
    return result.data;
  },
};
