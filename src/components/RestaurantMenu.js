import { useEffect, useState } from "react";
import { RESTAURANT_MENU_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import Accordian from "./Accordian";
import { useParams } from "react-router";

const RestaurantMenu = () => {
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
      }
    );

    const menuJson = await menuResponse.json();

    setMenuData(menuJson.data);
  };
  if (menuData === null) {
    return <Shimmer />;
  }

  const { name, avgRating, totalRatingsString, costForTwoMessage } =
    menuData?.cards[2]?.card?.card?.info;
  const accordianList =
    menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  console.log(accordianList);

  return (
    <div>
      <h1>{name}</h1>
      <h4>
        ⭐ {avgRating} ({totalRatingsString})
      </h4>
      <h3>{costForTwoMessage}</h3>
      {accordianList?.map((element) => {
        const { itemCards, title } = element.card.card;
        return itemCards ? (
          <Accordian key={title} itemCards={itemCards} title={title} />
        ) : null;
      })}
    </div>
  );
};

export default RestaurantMenu;
