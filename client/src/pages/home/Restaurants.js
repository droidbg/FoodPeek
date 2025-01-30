import RestaurantCard, {
  useWithTopRatedLabel,
} from "../../components/RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "../../components/Shimmer";
import { RESTAURANT_LIST_URL } from "../../utils/constants";
import { Link } from "react-router";
import UserContext from "../../utils/UserContext";

const Restaurants = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const { name, setName } = useContext(UserContext);

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

  return (
    <div>
      <div className="filter flex m-2 p-2">
        <div className="search bg-green-100 m-2 px-2 py-2 rounded-lg shadow-md">
          <label className="search-btn mr-2">Search</label>
          <input
            className="border border-slate-900 mr-2 rounded-md pl-1"
            type="text"
            onChange={(text) => {
              filterUsingSearch(text.target.value);
            }}
          />
        </div>
        <div className="flex top-rated bg-yellow-100 m-2 px-2 py-1 rounded-lg shadow-lg text-center">
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
        <div className="m-2 p-2 rounded-lg bg-blue-200 ">
          <label className="mr-2">Change Name</label>
          <input
            className="border border-black rounded-lg"
            value={name}
            onChange={(text) => {
              // console.log(text.target.value);
              setName(text.target.value);
            }}
          />
        </div>
      </div>
      {filteredList.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap m-2 ml-12">
          {filteredList.map((data) => {
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
