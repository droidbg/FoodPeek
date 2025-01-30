import { useState } from "react";
import AccordianBody from "./AccordionBody";

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
        <span className="font-bold text-lg">
          {title} ({itemCards.length})
        </span>
        <span className="font-bold">{showItem ? "↑" : "↓"}</span>
      </div>

      {showItem && (
        <div className="accordion-body">
          {itemCards.map((item) => {
            return <AccordianBody itemInfo={item.card.info} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Accordian;
