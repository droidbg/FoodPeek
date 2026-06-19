import { Link } from "react-router";

const cartIllustration = new URL("../../../assets/cart.svg", import.meta.url)
  .href;

/** Friendly empty state shown when the cart has no items. */
const EmptyCart = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
    <img
      src={cartIllustration}
      alt=""
      role="presentation"
      className="h-40 w-40 opacity-90"
      width="160"
      height="160"
    />
    <h2 className="mt-6 font-[Tangerine] text-5xl font-bold text-[#7a1f4f]">
      Your cart is empty
    </h2>
    <p className="mt-2 max-w-sm text-[#3a2230]/60">
      Looks like you haven't added anything yet. Discover something delicious to
      get started.
    </p>
    <Link
      to="/"
      className="mt-7 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 px-8 py-3 font-bold tracking-wide text-white shadow-lg shadow-pink-300 transition-transform hover:-translate-y-0.5 active:scale-95"
    >
      Browse restaurants
    </Link>
  </div>
);

export default EmptyCart;
