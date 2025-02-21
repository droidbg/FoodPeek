import { IMAGES_URL, DEFAULT_FOOD_IMAGE } from "../../utils/constants";

const MenuBody = ({ itemInfo }) => {
  const { name, price, description, imageId, isVeg, defaultPrice } = itemInfo;
  return (
    <div className="w-52  transition-all p-2 m-auto  hover:bg-pink-100  hover:scale-95  hover:rounded-[4px] hover:shadow-[#f5474750] hover:shadow-lg cursor-pointer">
      <div>
        <img
          className="rounded-2xl h-44 object-cover w-full"
          src={imageId ? IMAGES_URL + imageId : DEFAULT_FOOD_IMAGE}
        ></img>
      </div>

      <div>{name}</div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs text-gray-600">
        {description}
      </div>
      <div className="mt-2 flex justify-between px-2">
        <span>₹{(price ?? defaultPrice) / 100} </span>
        <button className="ml-2 bg-black text-white py-1 px-3 rounded-xl shadow-lg  ">
          Add
        </button>
      </div>
    </div>
  );
};

export default MenuBody;
