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

  const { name, avgRating, totalRatingsString, costForTwoMessage, cuisines } =
    menuData?.cards[2]?.card?.card?.info;

  //console.log(menuData?.cards[2]?.card?.card?.info);
  return (
    <div className="w-6/12 m-auto">
      <div className="font-bold text-2xl mt-6 mb-2">{name}</div>
      <div className="font-bold text-m mb-3  ">
        <span>
          ⭐ {avgRating ?? "--"} ({totalRatingsString})
        </span>
        <span className="mx-2"> ⋅ {costForTwoMessage}</span>
        <div className="text-sm font-bold p-2"> {cuisines.join(", ")}</div>
      </div>
      {filterCategory?.map((element) => {
        return (
          <Accordian key={element.card.card.title} data={element.card.card} />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
