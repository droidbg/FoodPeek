import { useEffect } from "react";
import NoInternet from "../../components/common/NoInternet";
import SampleDataNotice from "../../components/common/SampleDataNotice";
import Shimmer from "../../components/common/Shimmer";
import CategoryNav from "../../features/menu/components/CategoryNav";
import MenuHero from "../../features/menu/components/MenuHero";
import MenuSection from "../../features/menu/components/MenuSection";
import OrderBar from "../../features/menu/components/OrderBar";
import useMenu from "../../hooks/useMenu";
import useOnlineStatus from "../../hooks/useOnlineStatus";

const sectionId = (categoryId, index) => `menu-cat-${categoryId ?? index}`;

const Menu = () => {
  const menuData = useMenu();
  const onlineStatus = useOnlineStatus();

  // Publish the global header's height so the sticky category bar can offset
  // beneath it and sections can scroll clear of both bars.
  useEffect(() => {
    const setHeaderHeight = () => {
      const header = document.querySelector("[data-app-header]");
      if (header) {
        document.documentElement.style.setProperty(
          "--app-header-h",
          `${header.offsetHeight}px`,
        );
      }
    };
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
  }, []);

  if (!onlineStatus) {
    return <NoInternet />;
  }
  if (menuData === null) {
    return <Shimmer />;
  }

  const {
    name,
    cuisines = [],
    filterCategory = [],
    areaName,
    locality,
    city,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    isSample,
  } = menuData;

  const categories = filterCategory.map((element, index) => ({
    id: sectionId(element.card.card.categoryId, index),
    title: element.card.card.title,
    count: element.card.card.itemCards?.length ?? 0,
  }));

  const place = [locality, areaName, city].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-[#fdf2f8]">
      {isSample ? (
        <SampleDataNotice message="Showing a sample menu — live menu is currently unavailable." />
      ) : null}

      <MenuHero
        name={name}
        cuisines={cuisines}
        avgRating={avgRating}
        totalRatingsString={totalRatingsString}
        costForTwoMessage={costForTwoMessage}
        place={place}
      />

      <CategoryNav categories={categories} />

      <div className="mx-auto max-w-4xl px-5 pb-32">
        {filterCategory.map((element, index) => (
          <MenuSection
            key={categories[index].id}
            id={categories[index].id}
            data={element.card.card}
          />
        ))}
      </div>

      <OrderBar />
    </div>
  );
};

export default Menu;
