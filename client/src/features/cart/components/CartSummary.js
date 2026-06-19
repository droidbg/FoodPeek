import { formatRupees } from "../../../utils/menu";

const DELIVERY_FEE_PAISE = 4000; // ₹40
const FREE_DELIVERY_THRESHOLD_PAISE = 50000; // free over ₹500
const GST_RATE = 0.05;

/** Computes the order bill from the items subtotal (in paise). */
export const computeBill = (subtotalPaise) => {
  const deliveryPaise =
    subtotalPaise >= FREE_DELIVERY_THRESHOLD_PAISE ? 0 : DELIVERY_FEE_PAISE;
  const taxesPaise = Math.round(subtotalPaise * GST_RATE);
  return {
    subtotalPaise,
    deliveryPaise,
    taxesPaise,
    totalPaise: subtotalPaise + deliveryPaise + taxesPaise,
  };
};

const Row = ({ label, value, muted }) => (
  <div className="flex items-center justify-between text-sm">
    <span className={muted ? "text-[#3a2230]/60" : "text-[#3a2230]"}>
      {label}
    </span>
    <span
      className={muted ? "text-[#3a2230]/60" : "font-medium text-[#3a2230]"}
    >
      {value}
    </span>
  </div>
);

/**
 * Bill summary card: itemised charges, the grand total, and the order actions.
 */
const CartSummary = ({ subtotalPaise, onPlaceOrder, onClear }) => {
  const { deliveryPaise, taxesPaise, totalPaise } = computeBill(subtotalPaise);

  return (
    <div className="rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-[0_10px_30px_-16px_rgba(214,51,132,0.4)] backdrop-blur-sm">
      <h2 className="font-[Tangerine] text-3xl font-bold text-[#7a1f4f]">
        Bill Details
      </h2>

      <div className="mt-4 space-y-2.5">
        <Row label="Item total" value={formatRupees(subtotalPaise)} />
        <Row
          label="Delivery fee"
          value={deliveryPaise === 0 ? "FREE" : formatRupees(deliveryPaise)}
          muted
        />
        <Row
          label="Taxes & charges (5%)"
          value={formatRupees(taxesPaise)}
          muted
        />
        <div className="my-3 border-t border-dashed border-pink-200" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-[#3a2230]">To Pay</span>
          <span className="text-lg font-bold text-pink-700">
            {formatRupees(totalPaise)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        className="mt-6 w-full rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 py-3 font-bold tracking-wide text-white shadow-lg shadow-pink-300 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        Place Order · {formatRupees(totalPaise)}
      </button>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 w-full text-sm font-medium text-pink-500 transition hover:text-pink-700"
      >
        Clear cart
      </button>
    </div>
  );
};

export default CartSummary;
