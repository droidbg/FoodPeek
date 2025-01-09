import { IMAGES_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  const { data } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } =
    data.info;

  return (
    <div className="w-52  m-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
      <div>
        <img className="rounded-lg" src={IMAGES_URL + cloudinaryImageId}></img>
        <h4 className="my-2 font-bold">{name} </h4>
        <h4> {costForTwo} </h4>
        <h4> {cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
      </div>
    </div>
  );
};
export default RestaurantCard;
