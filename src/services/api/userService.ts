
import { User } from "@/data/mockUserData";
import { apiRequest } from "./apiClient";

export interface UserCreateDto {
  name: string;
  email: string;
  address: string;
  role: 'user' | 'store_owner' | 'admin';
  password: string;
}

export interface UserUpdateDto {
  name?: string;
  email?: string;
  address?: string;
  role?: 'user' | 'store_owner' | 'admin';
}

/**
 * User API Service
 */
export const userService = {
  /**
   * Get all users
   */
  getAll: async (): Promise<User[]> => {
    return apiRequest<User[]>("/users");
  },
  
  /**
   * Get user by ID
   */
  getById: async (id: number): Promise<User> => {
    return apiRequest<User>(`/users/${id}`);
  },
  
  /**
   * Create a new user
   */
  create: async (userData: UserCreateDto): Promise<User> => {
    return apiRequest<User>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  
  /**
   * Update an existing user
   */
  update: async (id: number, userData: UserUpdateDto): Promise<User> => {
    return apiRequest<User>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  },
  
  /**
   * Delete a user
   */
  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/users/${id}`, {
      method: "DELETE",
    });
  },
};
