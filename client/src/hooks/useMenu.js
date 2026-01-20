import useSWR from "swr";
import { useParams } from "react-router";
import { fetcher, API_ENDPOINTS } from "../services/api";

/**
 * Custom hook to fetch restaurant menu data
 * @returns {object} - Menu data with restaurant info and categories
 */
const useMenu = () => {
  const { restaurantId } = useParams();

  const { data, error, isLoading } = useSWR(
    restaurantId ? API_ENDPOINTS.RESTAURANT_MENU(restaurantId) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1300000,  
    }
  );

  if (isLoading || !data) return null;
  if (error) return null;

  // Determine device type and get appropriate index
  const userAgent = navigator.userAgent;
  const indexSelect = /android|iphone/i.test(userAgent) ? 5 : 4;

  const menuData = data?.data;

  // Filter menu categories
  const filterCategory = menuData?.cards[
    indexSelect
  ]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((element) => {
    return (
      element.card.card["@type"] ===
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
  };
};

export default useMenu;
