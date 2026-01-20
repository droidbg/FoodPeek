import MenuBody from "./MenuBody";

const MenuSection = ({ data }) => {
  const { itemCards, title } = data;

  return (
    <div>
      <div className="mt-12 flex w-full items-center justify-center">
        <div className="w-full border-t border-dotted border-pink-400"> </div>
        <span className="absolute skew-x-[-10deg] rounded-lg border bg-black p-1 px-2 text-white">
          {title}
        </span>
      </div>
      <div className="mt-10 mb-12 flex flex-wrap">
        {itemCards.map((item) => {
          return (
            <MenuBody itemInfo={item.card.info} key={item.card.info.name} />
          );
        })}
      </div>
    </div>
  );
};

export default MenuSection;
