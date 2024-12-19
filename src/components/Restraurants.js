import ResturantCard from "./Resturantcard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Restaurants = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [searchText, setSearchText] = useState("");
  console.log("RENDERED");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999",
      {
        headers: {
          "x-cors-api-key": process.env.API_KEY,
        },
      }
    );

    const json = await data.json();

    const list =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setOriginalList(list);
    setFilteredList(list);
  };

  const filterUsingSearch = (text) => {
    const filterSearch = originalList.filter((item) =>
      item.info.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredList(filterSearch);
  };

  return filteredList.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="filter">
        <div className="search-container">
          <input
            type="text"
            value={searchText}
            onChange={(text) => {
              setSearchText(text.target.value);
            }}
          />
          <button
            className="search-button"
            onClick={() => {
              filterUsingSearch(searchText);
            }}
          >
            Search
          </button>
        </div>
        <div className="top-rated">
          <button
            onClick={() => {
              const filterList = originalList.filter((element) => {
                return element.info.avgRating > 4.5;
              });

              setFilteredList(filterList);
            }}
          >
            Top Rated Resturants
          </button>
        </div>
      </div>

      <div className="res-containers">
        {filteredList.map((data) => {
          return <ResturantCard data={data} key={data.info.id} />;
        })}
      </div>
    </div>
  );
};
export default Restaurants;
