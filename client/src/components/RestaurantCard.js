import { IMAGES_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  const { data } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } =
    data.info;

  return (
    <div className="w-48 md:w-56 lg:w-64 transition-all p-2 rounded-2xl bg-red-100 hover:bg-pink-100  hover:scale-95  hover:rounded-[4px] hover:shadow-[#f5474750] hover:shadow-lg">
      <div>
        <img
          className="rounded-lg h-44 object-cover w-full"
          src={IMAGES_URL + cloudinaryImageId}
        ></img>
        <h4 className="my-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </h4>
        <h4> {costForTwo} </h4>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {cuisines.join(", ")}
        </p>
        <h4>⭐ {avgRating}</h4>
      </div>
    </div>
  );
};

// Higher Order Function - a function which takes component as input and return a enhance component

export const useWithTopRatedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative ">
        <div className="ribbon">
          <span>Top Rated</span>
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
