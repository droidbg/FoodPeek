import useInView from "../hooks/useInView";
import MenuItemCard from "./MenuItemCard";

/**
 * A menu category as an anchored section: a left-aligned heading with an item
 * count, then a responsive grid of dish cards that reveal (staggered) the first
 * time the section scrolls into view. `id` is the CategoryNav scroll target.
 */
const MenuSection = ({ id, data }) => {
  const { itemCards = [], title } = data;
  const [ref, inView] = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-[calc(var(--app-header-h)+72px)] py-8 ${
        inView ? "fp-inview" : ""
      }`}
    >
      <div className="mb-6 flex items-end gap-3">
        <h2 className="font-[Tangerine] text-4xl font-bold text-[#7a1f4f]">
          {title}
        </h2>
        <span className="mb-1 rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-bold text-pink-600">
          {itemCards.length}
        </span>
        <span className="mb-2 h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2">
        {itemCards.map((item, index) => (
          <MenuItemCard
            key={item.card.info.id}
            info={item.card.info}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
