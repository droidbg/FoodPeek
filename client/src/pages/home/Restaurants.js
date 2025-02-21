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
      item.info.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredList(filterSearch);
  };

  return (
    <div>
      <div className="m-2 flex p-2 filter">
        <div className="search m-2 rounded-lg border border-slate-400 bg-blue-100 py-1 pl-2 shadow-md">
          <label className="search-btn mr-2">🔍</label>
          <input
            className="w-36 rounded-md bg-transparent pl-1 outline-none md:mr-2 md:w-fit"
            type="text"
            onChange={(text) => {
              filterUsingSearch(text.target.value);
            }}
            placeholder="I want to eat at...."
          />
        </div>
        <div className="my-auto ml-2 md:ml-4">Filter By : </div>
        <div className="top-rated m-2 flex rounded-lg bg-yellow-100 px-2 py-1 text-center shadow-lg hover:scale-105 hover:cursor-pointer hover:shadow-md hover:shadow-amber-300">
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
        <div className="m-2 ml-12 flex flex-wrap" ref={animationParent}>
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
