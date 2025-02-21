import { IMAGES_URL, DEFAULT_FOOD_IMAGE } from "../../utils/constants";

const MenuBody = ({ itemInfo }) => {
  const { name, price, description, imageId, isVeg, defaultPrice } = itemInfo;
  return (
    <div className="m-auto w-52 cursor-pointer p-2 transition-all hover:scale-95 hover:rounded-[4px] hover:bg-pink-100 hover:shadow-lg hover:shadow-[#f5474750]">
      <div>
        <img
          className="h-44 w-full rounded-2xl object-cover"
          src={imageId ? IMAGES_URL + imageId : DEFAULT_FOOD_IMAGE}
        ></img>
      </div>

      <div>{name}</div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-600">
        {description}
      </div>
      <div className="mt-2 flex justify-between px-2">
        <span>₹{(price ?? defaultPrice) / 100} </span>
        <button className="ml-2 rounded-xl bg-black px-3 py-1 text-white shadow-lg">
          Add
        </button>
      </div>
    </div>
  );
};

export default MenuBody;
