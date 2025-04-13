
import { toast } from "sonner";

// Base API URL - this should be configured based on your environment
export const API_BASE_URL = "http://localhost:3000/api";

/**
 * Handles API errors and optionally shows a toast notification
 */
export const handleApiError = (error: any, showToast = true): never => {
  console.error("API Error:", error);
  
  let errorMessage = "An unexpected error occurred";
  
  if (error.response) {
    // The request was made and the server responded with a status code outside the 2xx range
    errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
    console.error("Response data:", error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = "No response received from server";
    console.error("Request:", error.request);
  }
  
  if (showToast) {
    toast.error(errorMessage);
  }
  
  throw error;
};

/**
 * Base API request function with error handling
 */
export const apiRequest = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  // Get auth token from localStorage if it exists
  const token = localStorage.getItem("authToken");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }
  
  // Merge default headers with provided headers
  const headers = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });
    
    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { response: { status: response.status, data: errorData } };
    }
    
    // Parse JSON response if there is one
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return await response.json();
    }
    
    return {} as T;
  } catch (error) {
    return handleApiError(error);
  }
};
