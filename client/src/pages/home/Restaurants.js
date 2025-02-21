import RestaurantCard, {
  useWithTopRatedLabel,
} from "../../components/RestaurantCard";
import { useEffect, useState, useRef } from "react";
import Shimmer from "../../components/Shimmer";
import { RESTAURANT_LIST_URL } from "../../utils/constants";
import { Link } from "react-router";

import { useAutoAnimate } from "@formkit/auto-animate/react";

const Restaurants = () => {
  let indexSelect = 1;
  const [filteredList, setFilteredList] = useState([]);
  const [originalList, setOriginalList] = useState([]);

  const [animationParent] = useAutoAnimate();

  const ResturantWithLabel = useWithTopRatedLabel(RestaurantCard);

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

    const userAgent = navigator.userAgent;
    if (/android|iphone/i.test(userAgent)) {
      indexSelect = 2;
    } else if (/windows|mac|linux/i.test(userAgent)) {
      indexSelect = 1;
    } else {
      indexSelect = 1;
    }

    const list =
      json?.data?.cards[indexSelect]?.card?.card?.gridElements?.infoWithStyle
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

  return (
    <div>
      <div className="filter flex m-2 p-2">
        <div className="search bg-blue-100 m-2 pl-2 py-1 rounded-lg shadow-md border border-slate-400">
          <label className="search-btn mr-2">🔍</label>
          <input
            className="bg-transparent md:mr-2 rounded-md pl-1 outline-none w-36 md:w-fit"
            type="text"
            onChange={(text) => {
              filterUsingSearch(text.target.value);
            }}
            placeholder="I want to eat at...."
          />
        </div>
        <div className="ml-2 md:ml-4 my-auto">Filter By : </div>
        <div className="flex top-rated bg-yellow-100 m-2 px-2 py-1 rounded-lg shadow-lg text-center hover:scale-105 hover:cursor-pointer hover:shadow-md hover:shadow-amber-300">
          <button
            onClick={() => {
              const filterList = originalList.filter((element) => {
                return element.info.avgRating >= 4.5;
              });

              setFilteredList(filterList);
            }}
          >
            Top Rated Resturants
          </button>
        </div>
      </div>
      {filteredList?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap m-2 ml-12 " ref={animationParent}>
          {filteredList?.map((data) => {
            const id = data.info.id;
            return (
              <div className="m-2" key={id}>
                <Link to={"/restaurant/" + id}>
                  {data.info.avgRating >= 4.5 ? (
                    <ResturantWithLabel data={data} />
                  ) : (
                    <RestaurantCard data={data} />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Restaurants;
