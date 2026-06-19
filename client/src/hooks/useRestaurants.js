import useSWR from "swr";
import { fetcher, API_ENDPOINTS } from "../services/api";
import { SAMPLE_RESTAURANTS } from "../data/sampleRestaurants";
import { isMobileDevice } from "../utils/device";

/**
 * Custom hook to fetch restaurant list
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {object} - { restaurants, isLoading, isError, isSample, mutate }.
 *   Falls back to a 100+ item sample dataset (with `isSample: true`) when the
 *   API errors out or returns an empty list.
 */
export const useRestaurants = (lat, lng) => {
  const { data, error, isLoading, mutate } = useSWR(
    API_ENDPOINTS.RESTAURANT_LIST(lat, lng),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // Cache for 1 minute
    },
  );

  // Determine device type and get appropriate index
  const getRestaurantList = () => {
    if (!data) return null;

    const indexSelect = isMobileDevice() ? 2 : 1;

    return (
      data?.data?.cards[indexSelect]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || []
    );
  };

  // Only show the loading state on the very first fetch. Once an error is
  // latched we go straight to sample data and never flip back to the skeleton.
  if (isLoading && !error) {
    return {
      restaurants: null,
      isLoading: true,
      isError: error,
      isSample: false,
      mutate,
    };
  }

  // Fall back to sample data on error or an empty/unusable response.
  const restaurants = getRestaurantList();
  if (error || !restaurants || restaurants.length === 0) {
    return {
      restaurants: SAMPLE_RESTAURANTS,
      isLoading: false,
      isError: error,
      isSample: true,
      mutate,
    };
  }

  return { restaurants, isLoading, isError: error, isSample: false, mutate };
};
