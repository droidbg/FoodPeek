import { IMAGES_URL, DEFAULT_FOOD_IMAGE } from "../utils/constants";
import NonVegSymbol from "./NonVegSymbol";
import VegSymbol from "./VegSymbol";

const AccordianBody = ({ itemInfo }) => {
  const { name, price, description, imageId, isVeg } = itemInfo;
  return (
    <div className="mb-4 ">
      <div className="flex pl-3 p-2 shadow-lg shadow-pink-200 bg-pink-100">
        <div className="content w-9/12 text-left">
          {isVeg ? <VegSymbol /> : <NonVegSymbol />}
          <div className="font-bold my-1 pr-2">{name}</div>
          <div>₹{price / 100}</div>
          <div className=" text-sm py-2">{description}</div>
        </div>
        <div className="image w-3/12 m-auto">
          <div className="relative">
            <button className="absolute bg-black text-white py-2 px-3 rounded-xl shadow-lg mx-4 mt-16 ">
              Add +
            </button>
          </div>
          <img
            src={imageId ? IMAGES_URL + imageId : DEFAULT_FOOD_IMAGE}
            className="rounded-lg "
          />
        </div>
      </div>
      <div className="mt-3 border border-b-1 border-pink-200 shadow"></div>
    </div>
  );
};

export default AccordianBody;
