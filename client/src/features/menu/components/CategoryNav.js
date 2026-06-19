import { useEffect, useRef, useState } from "react";

/**
 * Sticky, glassy category rail for the menu page. Tabs scroll their section to
 * the top on click, and the active tab tracks the section in view via
 * IntersectionObserver (scroll-spy). Offsets beneath the measured app header.
 *
 * @param {{ categories: { id: string, title: string, count: number }[] }} props
 */
const CategoryNav = ({ categories }) => {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const tabRefs = useRef({});

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
      { rootMargin: "-170px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

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
    <nav className="sticky top-[var(--app-header-h)] z-20 border-y border-pink-100 bg-white/65 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[category.id] = el;
              }}
              onClick={() => handleClick(category.id)}
              type="button"
              aria-current={isActive ? "true" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md shadow-pink-300"
                  : "bg-pink-50 text-pink-700 hover:bg-pink-100"
              }`}
            >
              {category.title}
              <span
                className={`rounded-full px-1.5 text-[11px] font-bold ${
                  isActive ? "bg-white/25" : "bg-white/70 text-pink-500"
                }`}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
