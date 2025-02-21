import { IMAGES_URL, DEFAULT_FOOD_IMAGE } from "../utils/constants";
import NonVegSymbol from "./NonVegSymbol";
import VegSymbol from "./VegSymbol";

const AccordianBody = ({ itemInfo }) => {
  const { name, price, description, imageId, isVeg } = itemInfo;
  return (
    <div className="mb-4">
      <div className="flex bg-pink-100 p-2 pl-3 shadow-lg shadow-pink-200">
        <div className="content w-9/12 text-left">
          {isVeg ? <VegSymbol /> : <NonVegSymbol />}
          <div className="my-1 pr-2 font-bold">{name}</div>
          <div>₹{price / 100}</div>
          <div className="py-2 text-sm">{description}</div>
        </div>
        <div className="image m-auto w-3/12">
          <div className="relative">
            <button className="absolute mx-4 mt-16 rounded-xl bg-black px-3 py-2 text-white shadow-lg">
              Add +
            </button>
          </div>
          <img
            src={imageId ? IMAGES_URL + imageId : DEFAULT_FOOD_IMAGE}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="border-b-1 mt-3 border border-pink-200 shadow"></div>
    </div>
  );
};

export default AccordianBody;
