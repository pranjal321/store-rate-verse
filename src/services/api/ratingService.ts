
import { apiRequest } from "./apiClient";

export interface Rating {
  id: number;
  storeId: number;
  userId: number;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface RatingCreateDto {
  storeId: number;
  rating: number;
  comment?: string;
}

export interface RatingUpdateDto {
  rating?: number;
  comment?: string;
}

/**
 * Rating API Service
 */
export const ratingService = {
  /**
   * Get all ratings for a store
   */
  getByStoreId: async (storeId: number): Promise<Rating[]> => {
    return apiRequest<Rating[]>(`/stores/${storeId}/ratings`);
  },
  
  /**
   * Get all ratings by a user
   */
  getByUserId: async (userId: number): Promise<Rating[]> => {
    return apiRequest<Rating[]>(`/users/${userId}/ratings`);
  },
  
  /**
   * Create a new rating
   */
  create: async (ratingData: RatingCreateDto): Promise<Rating> => {
    return apiRequest<Rating>(`/ratings`, {
      method: "POST",
      body: JSON.stringify(ratingData),
    });
  },
  
  /**
   * Update an existing rating
   */
  update: async (id: number, ratingData: RatingUpdateDto): Promise<Rating> => {
    return apiRequest<Rating>(`/ratings/${id}`, {
      method: "PATCH",
      body: JSON.stringify(ratingData),
    });
  },
  
  /**
   * Delete a rating
   */
  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/ratings/${id}`, {
      method: "DELETE",
    });
  },
};
