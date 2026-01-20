import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import RestaurantCard, {
  useWithTopRatedLabel,
} from "../../../components/common/RestaurantCard";
import Shimmer from "../../../components/common/Shimmer";
import { useRestaurants } from "../../../hooks/useRestaurants";

const RestaurantList = () => {
  const [searchText, setSearchText] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);

  const [animationParent] = useAutoAnimate();

  // Use SWR hook for data fetching
  const { restaurants, isLoading, isError } = useRestaurants();

  const ResturantWithLabel = useWithTopRatedLabel(RestaurantCard);

  // Memoized filtered list for better performance
  const filteredList = useMemo(() => {
    if (!restaurants) return [];

    let filtered = restaurants;

    // Apply search filter
    if (searchText) {
      const lowerText = searchText.toLowerCase();
      filtered = filtered.filter((item) =>
        item.info.name.toLowerCase().includes(lowerText),
      );
    }

    // Apply rating filter
    if (ratingFilter) {
      filtered = filtered.filter(
        (element) => element.info.avgRating >= ratingFilter,
      );
    }

    return filtered;
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

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-500">
          Failed to load restaurants. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
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
                    <ResturantWithLabel data={data} />
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
export default RestaurantList;
