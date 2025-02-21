import Shimmer from "../../components/Shimmer";

import useOnlineStatus from "../../hooks/useOnlineStatus";
import NoInternet from "../../components/NoInternet";

import useMenu from "../../hooks/useMenu";
import MenuSection from "../../components/Menu/MenuSection";

const Menu = () => {
  const menuData = useMenu();
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return <NoInternet />;
  }
  if (menuData === null) {
    return <Shimmer />;
  }
  const { name, cuisines, filterCategory, areaName, locality, city } = menuData;

  return (
    <div>
      <div className="w-full h-44 relative">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          src="https://png.pngtree.com/background/20220923/original/pngtree-template-promotion-food-cute-color-picture-image_1918764.jpg"
          alt="Background"
        />
        <div className="flex flex-col absolute justify-center items-center inset-0 ">
          <div className="text-7xl font-[Tangerine] font-extrabold  ">
            {name}
          </div>
          <div>
            {locality}, {city}, {areaName}
          </div>
          <div>Cuisines : {cuisines.join(", ")}</div>
        </div>
      </div>

      <div>
        {filterCategory.map((element, index) => (
          <MenuSection
            key={element.card.card.categoryId + index}
            data={element.card.card}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
