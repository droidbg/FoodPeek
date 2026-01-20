import useSWR from "swr";
import { fetcher, API_ENDPOINTS } from "../services/api";

/**
 * Custom hook to fetch restaurant list
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {object} - SWR response with data, error, isLoading
 */
export const useRestaurants = (lat, lng) => {
    const { data, error, isLoading, mutate } = useSWR(
        API_ENDPOINTS.RESTAURANT_LIST(lat, lng),
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // Cache for 1 minute
        }
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

    return {
        restaurants: getRestaurantList(),
        isLoading,
        isError: error,
        mutate,
    };
};
