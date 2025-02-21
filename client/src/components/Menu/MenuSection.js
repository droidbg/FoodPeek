import MenuBody from "./MenuBody";

const MenuSection = ({ data }) => {
  const { itemCards, title } = data;

  return (
    <div>
      <div className="w-full justify-center flex items-center mt-12">
        <div className="border-t border-dotted border-pink-400 w-full"> </div>
        <span className="absolute border bg-black text-white p-1 rounded-lg px-2 skew-x-[-10deg]">
          {title}
        </span>
      </div>
      <div className="flex mt-10 mb-12 flex-wrap">
        {itemCards.map((item) => {
          return <MenuBody itemInfo={item.card.info} />;
        })}
      </div>
    </div>
  );
};

export default MenuSection;
