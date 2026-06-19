import VegBadge from "../../../components/common/VegBadge";
import {
  dishGradient,
  dishImageUrl,
  formatRupees,
  isVegItem,
} from "../../../utils/menu";
import AddControl from "./AddControl";

/**
 * A single dish, presented as an elevated card: an image (or a deterministic
 * gradient monogram when there's no photo) with the veg badge and a floating
 * Add control, above the name, description and price.
 *
 * @param {{ info: object, index?: number }} props
 */
const MenuItemCard = ({ info, index = 0 }) => {
  const { id, name, description, imageId } = info;
  const pricePaise = info.price ?? info.defaultPrice ?? 0;
  const image = dishImageUrl(imageId);
  const veg = isVegItem(info);

  return (
    <article
      className="fp-reveal group relative flex flex-col overflow-hidden rounded-3xl border border-pink-100/80 bg-white/70 shadow-[0_10px_30px_-14px_rgba(214,51,132,0.3)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(214,51,132,0.45)]"
      style={{ "--reveal-delay": `${(index % 8) * 60}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={name}
            loading="lazy"
            width="400"
            height="250"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{ background: dishGradient(name) }}
            aria-hidden="true"
          >
            <span className="font-[Tangerine] text-7xl font-bold text-white/80 drop-shadow-sm">
              {name?.charAt(0) || "🍴"}
            </span>
          </div>
        )}

        <VegBadge veg={veg} className="absolute top-3 left-3" />

        <div className="absolute right-4 -bottom-5">
          <AddControl
            item={{ id, name, price: pricePaise, imageId, isVeg: veg }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-5 pt-8 pb-5">
        <h3 className="text-lg leading-tight font-bold text-[#3a2230]">
          {name}
        </h3>
        {description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-[#3a2230]/55">
            {description}
          </p>
        ) : null}
        <span className="mt-auto w-fit rounded-full bg-pink-100/80 px-3 py-1 text-sm font-bold text-pink-700">
          {formatRupees(pricePaise)}
        </span>
      </div>
    </article>
  );
};

export default MenuItemCard;
