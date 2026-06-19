import useSWR from "swr";
import { fetcher, API_ENDPOINTS } from "../services/api";
import { SAMPLE_RESTAURANTS } from "../data/sampleRestaurants";

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
      dedupingInterval: 60000, // Cache for 1 minute
    },
  );

  // Determine device type and get appropriate index
  const getRestaurantList = () => {
    if (!data) return null;

    const userAgent = navigator.userAgent;
    const indexSelect = /android|iphone/i.test(userAgent) ? 2 : 1;

    return (
      data?.data?.cards[indexSelect]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || []
    );
  };

  // Still fetching: let the UI show its loading state.
  if (isLoading) {
    return {
      restaurants: null,
      isLoading,
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
