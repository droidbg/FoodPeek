import { IMAGES_URL } from "../utils/constants";
const ResturantCard = (props) => {
  const { data } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } =
    data.info;

  return (
    <div className="res-card ">
      <div>
        <img className="res-logo" src={IMAGES_URL + cloudinaryImageId}></img>
        <h4>{name} </h4>
        <h4> {costForTwo} </h4>
        <h4> {cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
      </div>
    </div>
  );
};
export default ResturantCard;
