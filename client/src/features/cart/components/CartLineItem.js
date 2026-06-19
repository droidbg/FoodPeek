import VegBadge from "../../../components/common/VegBadge";
import { useCart } from "../../../context/CartContext";
import { dishGradient, dishImageUrl, formatRupees } from "../../../utils/menu";

/**
 * A single line in the cart: dish thumbnail (photo or gradient monogram),
 * name + veg badge, a quantity stepper, the line total, and a remove action.
 *
 * @param {{ line: { id, name, price, imageId, isVeg, qty } }} props
 */
const CartLineItem = ({ line }) => {
  const { add, decrement, removeItem } = useCart();
  const image = dishImageUrl(line.imageId);

  return (
    <div className="flex gap-4 py-5">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-pink-100">
        {image ? (
          <img
            src={image}
            alt={line.name}
            className="h-full w-full object-cover"
            loading="lazy"
            width="80"
            height="80"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: dishGradient(line.name) }}
            aria-hidden="true"
          >
            <span className="font-[Tangerine] text-4xl font-bold text-white/80">
              {line.name?.charAt(0) || "🍴"}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <VegBadge veg={line.isVeg} className="w-fit" />
        <h3 className="mt-1.5 truncate font-bold text-[#3a2230]">
          {line.name}
        </h3>
        <p className="text-sm text-[#3a2230]/55">
          {formatRupees(line.price)} each
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3 rounded-xl bg-[#3a2230] px-2 py-1 text-white">
            <button
              type="button"
              onClick={() => decrement(line.id)}
              aria-label={`Remove one ${line.name}`}
              className="flex h-6 w-6 items-center justify-center rounded-lg text-lg leading-none transition hover:bg-white/15 active:scale-90"
            >
              −
            </button>
            <span
              key={line.qty}
              className="fp-pop min-w-4 text-center text-sm font-bold tabular-nums"
              aria-live="polite"
            >
              {line.qty}
            </span>
            <button
              type="button"
              onClick={() => add(line)}
              aria-label={`Add one more ${line.name}`}
              className="flex h-6 w-6 items-center justify-center rounded-lg text-lg leading-none transition hover:bg-white/15 active:scale-90"
            >
              +
            </button>
          </div>

          <span className="font-bold text-[#3a2230]">
            {formatRupees(line.price * line.qty)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(line.id)}
        aria-label={`Remove ${line.name} from cart`}
        className="self-start text-pink-300 transition hover:text-pink-600"
      >
        ✕
      </button>
    </div>
  );
};

export default CartLineItem;
