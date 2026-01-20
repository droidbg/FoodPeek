/**
 * API Service Layer
 * Centralized API configuration and fetcher functions for SWR
 */

const PROXY_URL = "https://proxy.cors.sh/";
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Base fetcher function for SWR
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise} - Parsed JSON response
 */
export const fetcher = async (url, options = {}) => {
  const defaultHeaders = {
    "x-cors-api-key": API_KEY,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  RESTAURANT_LIST: (lat = 12.9351929, lng = 77.62448069999999) =>
    `${PROXY_URL}https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`,

  RESTAURANT_MENU: (restaurantId, lat = 12.9352403, lng = 77.624532) =>
    `${PROXY_URL}https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`,
};

/**
 * SWR Configuration
 */
export const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  dedupingInterval: 2000,
};
