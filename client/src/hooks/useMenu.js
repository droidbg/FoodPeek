import useSWR from "swr";
import { useParams } from "react-router";
import { fetcher, API_ENDPOINTS } from "../services/api";
import { SAMPLE_MENU } from "../data/sampleMenu";
import { isMobileDevice } from "../utils/device";

/**
 * Custom hook to fetch restaurant menu data
 * @returns {object|null} Menu data with restaurant info and categories, or
 *   `null` while loading. Falls back to a sample menu (with `isSample: true`)
 *   when the API errors out or returns no usable menu.
 */
const useMenu = () => {
  const { restaurantId } = useParams();

  const { data, error, isLoading } = useSWR(
    restaurantId ? API_ENDPOINTS.RESTAURANT_MENU(restaurantId) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      dedupingInterval: 1300000,
    },
  );

  // No restaurant in the route: show the loading state.
  if (!restaurantId) return null;

  // Sample menu carries the current fetch state alongside the static content.
  const sampleMenu = { ...SAMPLE_MENU, isLoading: false, isError: error };

  // Latch onto sample data once an error is seen so revalidation never flips
  // the page back to the loading skeleton.
  if (error) return sampleMenu;

  // Initial fetch in flight.
  if (isLoading) return null;

  // Settled with no payload → fall back to the sample menu.
  if (!data) return sampleMenu;

  try {
    // Determine device type and get appropriate index
    const indexSelect = isMobileDevice() ? 5 : 4;

    const menuData = data?.data;

    // Filter menu categories
    const filterCategory = menuData?.cards[
      indexSelect
    ]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((element) => {
      return (
        element?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

    // Extract restaurant info
    const {
      name,
      avgRating,
      totalRatingsString,
      costForTwoMessage,
      cuisines,
      areaName,
      locality,
      city,
    } = menuData?.cards[2]?.card?.card?.info || {};

    // If the payload didn't contain a usable menu, fall back to sample data.
    if (!name || !filterCategory || filterCategory.length === 0) {
      return sampleMenu;
    }

    return {
      name,
      avgRating,
      totalRatingsString,
      costForTwoMessage,
      cuisines,
      filterCategory,
      areaName,
      locality,
      city,
      isLoading,
      isError: error,
      isSample: false,
    };
  } catch {
    // Any unexpected shape in the live payload → graceful sample fallback.
    return sampleMenu;
  }
};

export default useMenu;
