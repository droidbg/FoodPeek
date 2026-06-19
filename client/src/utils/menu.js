import { IMAGES_URL } from "./constants";

/** Swiggy menu card `@type` that identifies an item category. */
export const ITEM_CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

/** Formats a paise amount as a rupee string (e.g. 29900 -> "₹299"). */
export const formatRupees = (paise) => {
  const rupees = (paise ?? 0) / 100;
  return `₹${Number.isInteger(rupees) ? rupees : rupees.toFixed(2)}`;
};

/** Swiggy encodes veg as `isVeg: 1`; normalize to a boolean. */
export const isVegItem = (info) => info?.isVeg === 1 || info?.isVeg === true;

/** Full CDN URL for a dish image, or null when there is no photo. */
export const dishImageUrl = (imageId) =>
  imageId ? `${IMAGES_URL}${imageId}` : null;

/** Warm pastel gradient pairs used for photo-less dish monograms. */
const DISH_GRADIENTS = [
  ["#ffe1ec", "#ffd0a6"],
  ["#ffe9c7", "#ffc1d9"],
  ["#fcd9ff", "#ffd6c0"],
  ["#ffd6e7", "#fff1b8"],
  ["#ffe7d1", "#ffc2c2"],
  ["#fff0c2", "#ffb3d1"],
];

/** Deterministic gradient for a dish, so the same name always looks the same. */
export const dishGradient = (seed = "") => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const [from, to] = DISH_GRADIENTS[hash % DISH_GRADIENTS.length];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};
