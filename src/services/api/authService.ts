
import { apiRequest, API_BASE_URL } from "./apiClient";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'store_owner' | 'admin';
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'store_owner' | 'admin';
  };
  token: string;
  refreshToken?: string;
}

/**
 * Authentication API Service
 */
export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    // Skip authentication middleware for login
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw { response: { status: response.status, data: error } };
    }
    
    const data = await response.json();
    
    // Save auth token to localStorage
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    
    return data;
  },
  
  /**
   * Register a new user
   */
  register: async (userData: RegisterDto): Promise<AuthResponse> => {
    // Skip authentication middleware for register
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw { response: { status: response.status, data: error } };
    }
    
    const data = await response.json();
    
    // Save auth token to localStorage if registration automatically logs in
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    
    return data;
  },
  
  /**
   * Logout the current user
   */
  logout: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Redirect to login page (can be handled by the component calling this method)
  },
  
  /**
   * Check if the user is currently authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },
  
  /**
   * Get the current authenticated user from localStorage
   */
  getCurrentUser: (): any => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  },
};
