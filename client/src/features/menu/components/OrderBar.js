import { Link } from "react-router";
import { formatRupees } from "../../../utils/menu";
import { useCart } from "../../../context/CartContext";

/**
 * Floating order summary. Stays tucked off-screen until the cart has items,
 * then slides up to show a live count + total with a CTA to the cart.
 */
const OrderBar = () => {
  const { count, totalPaise } = useCart();
  const hasItems = count > 0;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ease-out ${
        hasItems ? "translate-y-0" : "translate-y-[160%]"
      }`}
      inert={!hasItems}
    >
      <div className="pointer-events-auto m-4 mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-2xl bg-[#3a2230] px-5 py-3.5 text-white shadow-[0_18px_40px_-12px_rgba(122,31,79,0.6)]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/90 text-lg">
            🛒
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">
              {count} {count === 1 ? "item" : "items"}
            </p>
            <p className="text-xs text-pink-200">{formatRupees(totalPaise)}</p>
          </div>
        </div>
        <Link
          to="/cart"
          className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 px-6 py-2.5 text-sm font-bold tracking-wide shadow-lg shadow-pink-900/30 transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          View Cart →
        </Link>
      </div>
    </div>
  );
};

export default OrderBar;
