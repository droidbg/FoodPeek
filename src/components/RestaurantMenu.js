import Shimmer from "./Shimmer";
import Accordian from "./Accordian";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantMenu = () => {
  const menuData = useRestaurantMenu();
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return <div>INTERNET CONNECTION ISSUE</div>;
  }
  if (menuData === null) {
    return <Shimmer />;
  }

  const { name, avgRating, totalRatingsString, costForTwoMessage } =
    menuData?.cards[2]?.card?.card?.info;
  const accordianList =
    menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

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
