/**
 * Restaurant hero: a warm gradient-mesh band with soft grain and drifting
 * decorative blobs, the restaurant name oversized in the display hand, and
 * meta details as chips. Content rises in on load (staggered).
 */
const MenuHero = ({
  name,
  cuisines = [],
  avgRating,
  totalRatingsString,
  costForTwoMessage,
  place,
}) => {
  return (
    <header className="fp-hero fp-grain relative overflow-hidden">
      {/* Decorative drifting blobs */}
      <span
        aria-hidden="true"
        className="fp-float pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="fp-float pointer-events-none absolute -right-12 -bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-10">
        {cuisines.length > 0 ? (
          <p
            className="fp-rise text-xs font-semibold tracking-[0.28em] text-pink-500 uppercase"
            style={{ "--reveal-delay": "0ms" }}
          >
            {cuisines.join("  ·  ")}
          </p>
        ) : null}

        <h1
          className="fp-rise mt-2 font-[Tangerine] text-7xl leading-[0.95] font-bold text-[#7a1f4f] md:text-8xl"
          style={{ "--reveal-delay": "90ms" }}
        >
          {name}
        </h1>

        <div
          className="fp-rise mt-5 flex flex-wrap items-center gap-2.5 text-sm text-[#3a2230]/80"
          style={{ "--reveal-delay": "180ms" }}
        >
          {avgRating ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 px-3 py-1 font-bold text-white shadow-sm shadow-pink-300">
              ★ {avgRating}
            </span>
          ) : null}
          {totalRatingsString ? (
            <span className="rounded-full bg-white/70 px-3 py-1 font-medium backdrop-blur">
              {totalRatingsString} ratings
            </span>
          ) : null}
          {costForTwoMessage ? (
            <span className="rounded-full bg-white/70 px-3 py-1 font-medium backdrop-blur">
              {costForTwoMessage}
            </span>
          ) : null}
        </div>

        {place ? (
          <p
            className="fp-rise mt-3 flex items-center gap-1.5 text-sm text-pink-700/70"
            style={{ "--reveal-delay": "260ms" }}
          >
            <span aria-hidden="true">📍</span>
            {place}
          </p>
        ) : null}
      </div>
    </header>
  );
};

export default MenuHero;
