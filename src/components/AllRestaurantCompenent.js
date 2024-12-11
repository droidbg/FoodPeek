import Resturantcard from "./Resturantcard";
import reslist from "../utils/res-list";

const AllRestaurantCompenent = () => {
  return (
    <div className="res-containers">
      {reslist.map((data) => {
        return <Resturantcard data={data} key={data.info.id} />;
      })}
    </div>
  );
};
export default AllRestaurantCompenent;
