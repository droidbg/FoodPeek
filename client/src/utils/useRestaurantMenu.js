import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RESTAURANT_MENU_URL } from "../utils/constants";

const useRestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [menuData, setMenuData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const menuResponse = await fetch(
      RESTAURANT_MENU_URL + "&restaurantId=" + restaurantId,
      {
        headers: {
          "x-cors-api-key": import.meta.env.VITE_API_KEY,
        },
      },
    );

    const menuJson = await menuResponse.json();

    setMenuData(menuJson.data);
  };
  return menuData;
};

export default useRestaurantMenu;
