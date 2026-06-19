import { useEffect, useRef, useState } from "react";

/**
 * Sticky horizontal category navigation for the menu page.
 *
 * Tabs scroll their matching section to the top on click, and the active tab
 * is kept in sync with the section currently in view via IntersectionObserver
 * (scroll-spy). The sticky offset sits just below the global app header.
 *
 * @param {{ categories: { id: string, title: string }[] }} props
 */
const CategoryNav = ({ categories }) => {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const tabRefs = useRef({});

  // Scroll-spy: highlight the section nearest the top of the viewport.
  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (topMost) setActiveId(topMost.target.id);
      },
      // Trigger the swap once a section crosses below the sticky bars.
      { rootMargin: "-150px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  // Keep the active tab visible within the horizontal scroller.
  useEffect(() => {
    tabRefs.current[activeId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  const handleClick = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (categories.length === 0) return null;

  return (
    <nav className="sticky top-[var(--app-header-h)] z-20 border-b border-pink-200 bg-[#fdf2f8] shadow-sm">
      <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              ref={(el) => (tabRefs.current[category.id] = el)}
              onClick={() => handleClick(category.id)}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-black text-white shadow-md shadow-black/20"
                  : "bg-pink-100/70 text-pink-700 hover:bg-pink-200/80 hover:text-pink-900"
              }`}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
