import { IMAGES_URL } from "../../utils/constants";
const RestaurantCard = (props) => {
  const { data } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } =
    data.info;

  return (
    <div className="w-48 rounded-2xl bg-red-100 p-2 transition-all hover:scale-95 hover:rounded-[4px] hover:bg-pink-100 hover:shadow-lg hover:shadow-[#f5474750] md:w-56 lg:w-64">
      <div>
        <img
          className="h-44 w-full rounded-lg object-cover"
          src={IMAGES_URL + cloudinaryImageId}
          alt={`${name} restaurant`}
          width="256"
          height="176"
        ></img>
        <h4 className="my-2 overflow-hidden font-bold text-ellipsis whitespace-nowrap">
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
      <div className="relative">
        <div className="ribbon">
          <span>Top Rated</span>
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
