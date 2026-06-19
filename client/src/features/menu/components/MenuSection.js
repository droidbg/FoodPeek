import MenuBody from "./MenuBody";

/**
 * A menu category as an anchored section: a clean left-aligned heading with an
 * item count, followed by horizontal item rows separated by hairline dividers.
 * The `id` is the scroll target for the sticky CategoryNav, and `scroll-mt`
 * keeps the heading clear of the sticky header + nav.
 */
const MenuSection = ({ id, data }) => {
  const { itemCards = [], title } = data;

  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--app-header-h)+64px)] py-6"
    >
      <h2 className="flex items-baseline gap-2 text-2xl font-bold text-pink-900">
        {title}
        <span className="text-sm font-normal text-pink-400">
          ({itemCards.length})
        </span>
      </h2>
      <div className="divide-y divide-pink-100">
        {itemCards.map((item) => (
          <MenuBody itemInfo={item.card.info} key={item.card.info.id} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
