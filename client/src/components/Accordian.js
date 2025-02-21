import { useState } from "react";
import AccordianBody from "./AccordionBody";

const Accordian = ({ data }) => {
  const [showItem, setShowItem] = useState(false);

  const { itemCards, title } = data;
  const handleOnClick = () => {
    setShowItem(!showItem);
  };

  return (
    <div className="my-4 bg-pink-100 p-2 shadow shadow-rose-400 drop-shadow-lg">
      <div
        className="header my-2 flex cursor-pointer justify-between p-2"
        onClick={handleOnClick}
      >
        <span className="text-lg font-bold">
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
