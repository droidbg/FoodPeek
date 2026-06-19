/**
 * Veg / non-veg indicator: a squared outline with a centered dot, in a small
 * white chip so it reads clearly over dish imagery.
 */
const VegBadge = ({ veg, className = "" }) => {
  return (
    <span
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm backdrop-blur ${className}`}
    >
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
          veg ? "border-green-600" : "border-red-600"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            veg ? "bg-green-600" : "bg-red-600"
          }`}
        />
      </span>
      <span
        className={`text-[10px] font-bold tracking-wide uppercase ${
          veg ? "text-green-700" : "text-red-700"
        }`}
      >
        {veg ? "Veg" : "Non-veg"}
      </span>
    </span>
  );
};

export default VegBadge;
