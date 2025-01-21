import { useState } from "react";

const Accordian = ({ data }) => {
  const [showItem, setShowItem] = useState(false);
  // console.log(data);
  const { itemCards, title } = data;
  const handleOnClick = () => {
    setShowItem(!showItem);
  };

  return (
    <div className="my-4 bg-pink-100 shadow shadow-rose-400 drop-shadow-lg p-2">
      <div
        className="header flex justify-between p-2 cursor-pointer my-2"
        onClick={handleOnClick}
      >
        <span className="font-bold">
          {title} ({itemCards.length})
        </span>
        <span className="font-bold">{showItem ? "↑" : "↓"}</span>
      </div>

      {showItem && (
        <div className="body">
          {itemCards.map((item) => {
            const { name, price } = item.card.info;
            return (
              <div key={name + price}>
                {name} - Price: Rs. {price / 100}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Accordian;
