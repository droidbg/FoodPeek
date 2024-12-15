import Resturantcard from "./Resturantcard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const AllRestaurantCompenent = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  console.log("RENDERED");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    const list =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setOriginalList(list);
    setFilteredList(list);
  };
  if (filteredList.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <div className="filter">
        <div className="search">search</div>
        <div className="top-rated">
          <button
            onClick={() => {
              const filterList = originalList.filter((element) => {
                return element.info.avgRating > 4.5;
              });

              setFilteredList(filterList);
            }}
          >
            top rated resturants
          </button>
        </div>
      </div>

      <div className="res-containers">
        {filteredList.map((data) => {
          return <Resturantcard data={data} key={data.info.id} />;
        })}
      </div>
    </div>
  );
};
export default AllRestaurantCompenent;
