import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import CartLineItem from "../../features/cart/components/CartLineItem";
import CartSummary, {
  computeBill,
} from "../../features/cart/components/CartSummary";
import EmptyCart from "../../features/cart/components/EmptyCart";
import { formatRupees } from "../../utils/menu";

const Cart = () => {
  const { lines, count, totalPaise, clear } = useCart();
  const [placedTotal, setPlacedTotal] = useState(null);

  const handlePlaceOrder = () => {
    setPlacedTotal(computeBill(totalPaise).totalPaise);
    clear();
  };

  if (placedTotal !== null) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <div className="fp-pop flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl text-white shadow-lg shadow-green-200">
          ✓
        </div>
        <h1 className="mt-6 font-[Tangerine] text-6xl font-bold text-[#7a1f4f]">
          Order placed!
        </h1>
        <p className="mt-2 text-[#3a2230]/70">
          Your order of{" "}
          <span className="font-bold text-pink-700">
            {formatRupees(placedTotal)}
          </span>{" "}
          is on its way. 🛵
        </p>
        <Link
          to="/"
          className="mt-7 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 px-8 py-3 font-bold tracking-wide text-white shadow-lg shadow-pink-300 transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-[#fdf2f8]">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <header className="mb-8">
          <h1 className="font-[Tangerine] text-6xl leading-none font-bold text-[#7a1f4f]">
            Your Cart
          </h1>
          <p className="mt-2 text-[#3a2230]/60">
            {count} {count === 1 ? "item" : "items"} ready to order
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="divide-y divide-pink-100 rounded-3xl border border-pink-100 bg-white/70 px-5 shadow-[0_10px_30px_-16px_rgba(214,51,132,0.35)] backdrop-blur-sm">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <CartSummary
              subtotalPaise={totalPaise}
              onPlaceOrder={handlePlaceOrder}
              onClear={clear}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
