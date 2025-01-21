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

  const filterCategory =
    menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (element) => {
        return (
          element.card.card["@type"] ==
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );

  const { name, avgRating, totalRatingsString, costForTwoMessage } =
    menuData?.cards[2]?.card?.card?.info;

  return (
    <div className="text-center w-6/12 m-auto">
      <div className="font-bold text-xl mt-6 mb-2">{name}</div>
      <div className="font-bold text-m mb-3 ">
        <span>
          ⭐ {avgRating ?? "--"} ({totalRatingsString})
        </span>
        <span className="mx-2"> ⋅ {costForTwoMessage}</span>
      </div>
      {filterCategory?.map((element) => {
        const { itemCards, title } = element.card.card;
        return (
          itemCards && (
            <Accordian key={title} itemCards={itemCards} title={title} />
          )
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
