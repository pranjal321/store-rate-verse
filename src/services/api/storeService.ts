
import { apiRequest } from "./apiClient";

export interface Store {
  id: number;
  name: string;
  address: string;
  category: string;
  phone?: string;
  website?: string;
  ownerId: number;
  avgRating: number;
  totalRatings: number;
}

export interface StoreCreateDto {
  name: string;
  address: string;
  category: string;
  phone?: string;
  website?: string;
  ownerId: number;
}

export interface StoreUpdateDto {
  name?: string;
  address?: string;
  category?: string;
  phone?: string;
  website?: string;
  ownerId?: number;
}

/**
 * Store API Service
 */
export const storeService = {
  /**
   * Get all stores
   */
  getAll: async (): Promise<Store[]> => {
    return apiRequest<Store[]>("/stores");
  },
  
  /**
   * Get store by ID
   */
  getById: async (id: number): Promise<Store> => {
    return apiRequest<Store>(`/stores/${id}`);
  },
  
  /**
   * Create a new store
   */
  create: async (storeData: StoreCreateDto): Promise<Store> => {
    return apiRequest<Store>("/stores", {
      method: "POST",
      body: JSON.stringify(storeData),
    });
  },
  
  /**
   * Update an existing store
   */
  update: async (id: number, storeData: StoreUpdateDto): Promise<Store> => {
    return apiRequest<Store>(`/stores/${id}`, {
      method: "PATCH",
      body: JSON.stringify(storeData),
    });
  },
  
  /**
   * Delete a store
   */
  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/stores/${id}`, {
      method: "DELETE",
    });
  },
};
