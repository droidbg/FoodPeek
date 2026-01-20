import Shimmer from "../../components/common/Shimmer";

import NoInternet from "../../components/common/NoInternet";
import useOnlineStatus from "../../hooks/useOnlineStatus";

import MenuSection from "../../features/menu/components/MenuSection";
import useMenu from "../../hooks/useMenu";

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
      <div className="relative h-44 w-full">
        <img
          className="absolute top-0 left-0 h-full w-full rounded-lg object-cover"
          src="https://png.pngtree.com/background/20220923/original/pngtree-template-promotion-food-cute-color-picture-image_1918764.jpg"
          alt=""
          role="presentation"
          width="1200"
          height="176"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-[Tangerine] text-3xl font-extrabold md:text-7xl">
            {name}
          </div>
          <div>
            {locality}, {city}, {areaName}
          </div>
          <div>Cuisines : {cuisines.join(", ")}</div>
        </div>
      </div>

      <div>
        {filterCategory?.map((element, index) => (
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
