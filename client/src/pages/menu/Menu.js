import { useEffect } from "react";
import NoInternet from "../../components/common/NoInternet";
import SampleDataNotice from "../../components/common/SampleDataNotice";
import Shimmer from "../../components/common/Shimmer";
import CategoryNav from "../../features/menu/components/CategoryNav";
import MenuSection from "../../features/menu/components/MenuSection";
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
  }));

  const place = [locality, areaName, city].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-[#fdf2f8]">
      {isSample ? (
        <SampleDataNotice message="Showing a sample menu — live menu is currently unavailable." />
      ) : null}

      {/* Restaurant info — left-aligned, structured, no banner imagery */}
      <header className="border-b border-pink-200/70">
        <div className="mx-auto max-w-4xl px-5 pt-8 pb-6">
          <h1 className="font-[Tangerine] text-6xl leading-none font-bold text-pink-900 md:text-7xl">
            {name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-pink-700/90">
            {avgRating ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2.5 py-0.5 font-semibold text-pink-800">
                ★ {avgRating}
              </span>
            ) : null}
            {totalRatingsString ? (
              <span>{totalRatingsString} ratings</span>
            ) : null}
            {costForTwoMessage ? (
              <>
                <span className="text-pink-300">•</span>
                <span>{costForTwoMessage}</span>
              </>
            ) : null}
          </div>

          {cuisines.length > 0 ? (
            <p className="mt-2 text-sm text-pink-700/70">
              {cuisines.join(", ")}
            </p>
          ) : null}
          {place ? (
            <p className="mt-1 text-xs text-pink-500/80">{place}</p>
          ) : null}
        </div>
      </header>

      <CategoryNav categories={categories} />

      <div className="mx-auto max-w-4xl px-5 pb-24">
        {filterCategory.map((element, index) => (
          <MenuSection
            key={categories[index].id}
            id={categories[index].id}
            data={element.card.card}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
