import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { RESTAURANT_MENU_URL } from "../utils/constants";

const useMenu = () => {
  const { restaurantId } = useParams();
  const [menuData, setMenuData] = useState(null);
  let indexSelect = 4;
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
      }
    );

    const menuJson = await menuResponse.json();
    const data = menuJson.data;
    const userAgent = navigator.userAgent;
    if (/android|iphone/i.test(userAgent)) {
      indexSelect = 5;
    } else if (/windows|mac|linux/i.test(userAgent)) {
      indexSelect = 4;
    } else {
      indexSelect = 4;
    }

    const filterCategory = data?.cards[
      indexSelect
    ]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((element) => {
      return (
        element.card.card["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

    const {
      name,
      avgRating,
      totalRatingsString,
      costForTwoMessage,
      cuisines,
      areaName,
      locality,
      city,
    } = data?.cards[2]?.card?.card?.info;
    // console.log(data);

    const result = {
      name,
      avgRating,
      totalRatingsString,
      costForTwoMessage,
      cuisines,
      filterCategory,
      areaName,
      locality,
      city,
    };
    setMenuData(result);
  };
  return menuData;
};
export default useMenu;
