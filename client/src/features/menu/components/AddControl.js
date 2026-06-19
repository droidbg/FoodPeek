import { useCart } from "../../../context/CartContext";

/**
 * Add-to-cart control. Renders an "ADD" button until the item is in the cart,
 * then morphs into a − / quantity / + stepper. Wired to the global cart.
 *
 * @param {{ item: { id: string, name: string, price: number, imageId?: string, isVeg?: boolean } }} props
 */
const AddControl = ({ item }) => {
  const { qtyOf, add, decrement } = useCart();
  const qty = qtyOf(item.id);

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(item)}
        aria-label={`Add ${item.name}`}
        className="rounded-xl bg-[#3a2230] px-7 py-2 text-sm font-bold tracking-wide text-white shadow-lg shadow-pink-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-pink-400/50 active:translate-y-0 active:scale-95"
      >
        ADD <span className="ml-0.5 text-pink-300">+</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#3a2230] px-2 py-1.5 text-white shadow-lg shadow-pink-900/25">
      <button
        type="button"
        onClick={() => decrement(item.id)}
        aria-label={`Remove one ${item.name}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-lg leading-none transition hover:bg-white/15 active:scale-90"
      >
        −
      </button>
      <span
        key={qty}
        className="fp-pop min-w-5 text-center text-sm font-bold tabular-nums"
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={() => add(item)}
        aria-label={`Add one more ${item.name}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-lg leading-none transition hover:bg-white/15 active:scale-90"
      >
        +
      </button>
    </div>
  );
};

export default AddControl;
