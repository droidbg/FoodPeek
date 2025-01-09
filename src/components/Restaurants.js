import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_URL } from "../utils/constants";
import { Link } from "react-router";

const Restaurants = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANT_LIST_URL, {
      headers: {
        "x-cors-api-key": process.env.API_KEY,
      },
    });

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
      <div className="filter flex  m-2 p-2">
        <div className="search ">
          <input
            className="border border-slate-900 mr-2 rounded-md"
            type="text"
            value={searchText}
            onChange={(text) => {
              setSearchText(text.target.value);
            }}
          />
          <button
            className="search-btn bg-green-100 m-2 px-2 py-1 rounded-lg"
            onClick={() => {
              filterUsingSearch(searchText);
            }}
          >
            Search
          </button>
        </div>
        <div className=" top-rated bg-yellow-100 m-2 px-2 py-1 rounded-lg">
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

      <div className="flex flex-wrap m-2 ml-12">
        {filteredList.map((data) => {
          const id = data.info.id;
          return (
            <Link key={id} to={"/restaurant/" + id} className="link-tag">
              <RestaurantCard data={data} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Restaurants;
