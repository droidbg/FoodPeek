import { IMAGES_URL } from "../utils/constants";

const AccordianBody = ({ itemInfo }) => {
  console.log(itemInfo);
  const { name, price, description, imageId } = itemInfo;
  return (
    <div className="mb-4 ">
      <div className="flex pl-3 bg-pink-50 p-2 shadow shadow-pink-100">
        <div className="content w-9/12 text-left mr-1">
          <div className="font-bold">{name}</div>
          <div>₹{price / 100}</div>
          <div className=" text-sm">{description}</div>
        </div>
        <div className="image w-3/12 m-auto">
          <img src={IMAGES_URL + imageId} className="rounded-lg" />
        </div>
      </div>
      <div className="mt-4 border border-b-1 border-pink-200 shadow"></div>
    </div>
  );
};

export default AccordianBody;
