import useSWR from "swr";
import { useParams } from "react-router";
import { fetcher, API_ENDPOINTS } from "../services/api";
import { SAMPLE_MENU } from "../data/sampleMenu";

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
      dedupingInterval: 1300000,
    },
  );

  // No restaurant in the route, or still fetching: show the loading state.
  if (!restaurantId || isLoading) return null;

  // Sample menu carries the current fetch state alongside the static content.
  const sampleMenu = { ...SAMPLE_MENU, isLoading: false, isError: error };

  // On error or a missing payload, fall back to the sample menu.
  if (error || !data) return sampleMenu;

  try {
    // Determine device type and get appropriate index
    const userAgent = navigator.userAgent;
    const indexSelect = /android|iphone/i.test(userAgent) ? 5 : 4;

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
