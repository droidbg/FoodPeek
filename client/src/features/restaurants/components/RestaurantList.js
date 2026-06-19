import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import RestaurantCard, {
  useWithTopRatedLabel,
} from "../../../components/common/RestaurantCard";
import SampleDataNotice from "../../../components/common/SampleDataNotice";
import Shimmer from "../../../components/common/Shimmer";
import { useRestaurants } from "../../../hooks/useRestaurants";

// Hoisted to module scope: the wrapped component is stable across renders, so
// labeled cards don't remount on every keystroke (see rerender-no-inline-components).
const RestaurantWithLabel = useWithTopRatedLabel(RestaurantCard);

const RestaurantList = () => {
  const [searchText, setSearchText] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);

  const [animationParent] = useAutoAnimate();

  // Use SWR hook for data fetching. Falls back to sample data on error/empty.
  const { restaurants, isLoading, isSample } = useRestaurants();

  // Memoized filtered list — search and rating applied in a single pass.
  const filteredList = useMemo(() => {
    if (!restaurants) return [];

    const lowerText = searchText.toLowerCase();

    return restaurants.filter((item) => {
      if (searchText && !item.info.name.toLowerCase().includes(lowerText)) {
        return false;
      }
      if (ratingFilter && item.info.avgRating < ratingFilter) {
        return false;
      }
      return true;
    });
  }, [restaurants, searchText, ratingFilter]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleRatingFilter = () => {
    setRatingFilter(ratingFilter === 4.5 ? null : 4.5);
  };

  // Loading state
  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div>
      {isSample ? <SampleDataNotice /> : null}
      <div className="m-2 flex p-2 filter">
        <div className="search m-2 rounded-lg border border-slate-400 bg-blue-100 py-1 pl-2 shadow-md">
          <label htmlFor="restaurant-search" className="search-btn mr-2">
            🔍
          </label>
          <input
            id="restaurant-search"
            name="search"
            autoComplete="off"
            className="w-36 rounded-md bg-transparent pl-1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none md:mr-2 md:w-fit"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="I want to eat at…"
          />
        </div>
        <div className="my-auto ml-2 md:ml-4">Filter By : </div>
        <div
          className={`top-rated m-2 flex rounded-lg px-2 py-1 text-center shadow-lg hover:scale-105 hover:cursor-pointer hover:shadow-md hover:shadow-amber-300 ${
            ratingFilter === 4.5 ? "bg-amber-200" : "bg-yellow-100"
          }`}
        >
          <button onClick={handleRatingFilter}>
            {ratingFilter === 4.5 ? "Show All" : "Top Rated Restaurants"}
          </button>
        </div>
      </div>
      {filteredList.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-xl text-gray-500">No restaurants found</p>
        </div>
      ) : filteredList.length > 50 ? (
        <div
          className="m-2 ml-12 flex flex-wrap"
          style={{ contentVisibility: "auto" }}
        >
          {filteredList.map((data) => {
            const id = data.info.id;
            return (
              <div className="m-2" key={id}>
                <Link to={"/restaurant/" + id}>
                  {data.info.avgRating >= 4.5 ? (
                    <RestaurantWithLabel data={data} />
                  ) : (
                    <RestaurantCard data={data} />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="m-2 ml-12 flex flex-wrap" ref={animationParent}>
          {filteredList.map((data) => {
            const id = data.info.id;
            return (
              <div className="m-2" key={id}>
                <Link to={"/restaurant/" + id}>
                  {data.info.avgRating >= 4.5 ? (
                    <RestaurantWithLabel data={data} />
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
export default RestaurantList;
