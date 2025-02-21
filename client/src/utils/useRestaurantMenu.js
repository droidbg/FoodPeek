import { useEffect, useState } from "react";
import { RESTAURANT_MENU_URL } from "../utils/constants";
import { useParams } from "react-router";

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
          "x-cors-api-key": process.env.API_KEY,
        },
      },
    );

    const menuJson = await menuResponse.json();

    setMenuData(menuJson.data);
  };
  return menuData;
};

export default useRestaurantMenu;
