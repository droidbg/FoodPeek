import Resturantcard from "./Resturantcard";
import reslist from "../utils/res-list";
import { useState } from "react";

const AllRestaurantCompenent = () => {
  const [listOfRest, setListOfRest] = useState(reslist);

  return (
    <div>
      <div className="top-rated">
        <button
          onClick={() => {
            const filterList = reslist.filter((element) => {
              return element.info.avgRating > 4;
            });
            setListOfRest(filterList);
          }}
        >
          top rated resturants
        </button>
      </div>
      <div className="res-containers">
        {listOfRest.map((data) => {
          return <Resturantcard data={data} key={data.info.id} />;
        })}
      </div>
    </div>
  );
};
export default AllRestaurantCompenent;
