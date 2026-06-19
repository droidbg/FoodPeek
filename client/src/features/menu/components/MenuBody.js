import { IMAGES_URL } from "../../../utils/constants";

/**
 * Veg / non-veg marker — a square outline with a centered dot (green = veg,
 * red = non-veg), matching common food-app conventions.
 */
const VegMark = ({ veg }) => (
  <span
    title={veg ? "Veg" : "Non-veg"}
    className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
      veg ? "border-green-600" : "border-red-600"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full ${veg ? "bg-green-600" : "bg-red-600"}`}
    />
  </span>
);

/**
 * Minimal placeholder used when a dish has no photo: a soft pink/yellow tile
 * with the dish initial in the brand handwriting font. Replaces the old
 * repeating cartoon illustration so dishes stay visually distinct.
 */
const DishPlaceholder = ({ name }) => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-100">
    <span className="font-[Tangerine] text-5xl font-bold text-pink-300">
      {name?.charAt(0) || "🍴"}
    </span>
  </div>
);

/**
 * A single menu item rendered as a horizontal row:
 *   left  — veg mark, dish name, price, and full (untruncated) description
 *   right — a photo or minimal placeholder with the Add button anchored below.
 */
const MenuBody = ({ itemInfo }) => {
  const { name, price, description, imageId, isVeg, defaultPrice } = itemInfo;
  const rupees = (price ?? defaultPrice ?? 0) / 100;
  const veg = isVeg === 1 || isVeg === true;

  return (
    <div className="flex items-start justify-between gap-5 py-7 md:gap-10">
      <div className="flex min-w-0 flex-1 flex-col">
        <VegMark veg={veg} />
        <h3 className="mt-2 text-lg font-bold text-gray-900">{name}</h3>
        <p className="mt-1 font-semibold text-gray-800">₹{rupees}</p>
        {description ? (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-500">
            {description}
          </p>
        ) : null}
      </div>

      <div className="relative w-32 shrink-0 md:w-44">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-pink-100 bg-pink-50 shadow-sm">
          {imageId ? (
            <img
              className="h-full w-full object-cover"
              src={IMAGES_URL + imageId}
              alt={name}
              loading="lazy"
              width="176"
              height="132"
            />
          ) : (
            <DishPlaceholder name={name} />
          )}
        </div>
        <button
          type="button"
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-xl bg-black px-7 py-2 text-sm font-bold tracking-wide text-white shadow-lg shadow-black/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-pink-300/50 active:translate-y-0 active:scale-95"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default MenuBody;
