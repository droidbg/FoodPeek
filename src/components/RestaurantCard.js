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
{
  /* <div className="absolute right-[-5px] top-[-5px] z-[1] overflow-hidden w-[75px] h-[75px] text-right">
  <span
    className="text-[10px] font-bold text-white uppercase text-center leading-[20px] rotate-45 w-[100px] block bg-gradient-to-b from-[#3d2f21] to-[#896748] shadow-[0_3px_10px_-5px_rgba(0,0,0,1)] absolute top-[19px] right-[-21px] 
before:content-[''] before:absolute before:left-0 before:top-[100%] before:z-[-1] 
before:border-l-[3px] before:border-l-[#896748] before:border-r-[3px] before:border-r-transparent 
before:border-b-[3px] before:border-b-transparent before:border-t-[3px] before:border-t-[#896748]
after:content-[''] after:absolute after:right-0 after:top-[100%] after:z-[-1] 
after:border-l-[3px] after:border-l-transparent after:border-r-[3px] after:border-r-[#896748] 
after:border-b-[3px] after:border-b-transparent after:border-t-[3px] after:border-t-[#896748]"
  >
    Top Rated
  </span>
</div> */
  //Instead of using tailwind here, i am using css to let it be more clear - the ribbon on higher order component
}

export default RestaurantCard;
