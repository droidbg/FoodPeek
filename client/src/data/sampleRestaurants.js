/**
 * Sample Restaurant Data (Fallback)
 *
 * Deterministically expands the real seed entries in `utils/res-list.js`
 * into 100+ unique restaurants that match the live API shape exactly
 * (`{ info, analytics, cta }`). Used as a graceful fallback when the
 * restaurant-list API errors out or returns an empty result.
 *
 * Generation is pure and deterministic (no randomness / no timestamps),
 * so React keys stay stable across renders.
 */

import reslist from "../utils/res-list";

/**
 * Branch variants used to turn each real seed into several realistic
 * "chain locations" across the city. Variant 0 keeps the original entry
 * untouched; the rest are derived branches.
 */
const BRANCH_VARIANTS = [
  null, // variant 0 — original seed, unchanged
  {
    locality: "Indiranagar",
    areaName: "Indiranagar",
    ratingDelta: 0.1,
    deliveryDelta: 4,
  },
  {
    locality: "HSR Layout",
    areaName: "HSR Layout",
    ratingDelta: -0.2,
    deliveryDelta: 7,
  },
  {
    locality: "Whitefield",
    areaName: "Whitefield",
    ratingDelta: 0.2,
    deliveryDelta: 11,
  },
  {
    locality: "Jayanagar",
    areaName: "Jayanagar",
    ratingDelta: -0.1,
    deliveryDelta: 6,
  },
  {
    locality: "Marathahalli",
    areaName: "Marathahalli",
    ratingDelta: 0.0,
    deliveryDelta: 9,
  },
];

const clampRating = (value) =>
  Math.min(4.9, Math.max(3.0, Math.round(value * 10) / 10));

/**
 * Builds a single branch restaurant from a seed entry.
 * @param {object} seed - A real restaurant entry from res-list.
 * @param {number} variantIndex - Index into BRANCH_VARIANTS.
 * @returns {object} A restaurant object in API shape with a unique id.
 */
const buildBranch = (seed, variantIndex) => {
  const variant = BRANCH_VARIANTS[variantIndex];

  // Plain-JSON deep clone — every seed is JSON-serializable.
  const clone = JSON.parse(JSON.stringify(seed));

  if (!variant) return clone; // variant 0: keep the original seed as-is

  // Branch variants get a globally unique id so React keys never collide.
  clone.info.id = `${seed.info.id}-${variantIndex}`;

  const rating = clampRating(seed.info.avgRating + variant.ratingDelta);

  clone.info.name = `${seed.info.name} - ${variant.areaName}`;
  clone.info.locality = variant.locality;
  clone.info.areaName = variant.areaName;
  clone.info.avgRating = rating;
  clone.info.avgRatingString = rating.toFixed(1);

  if (clone.info.sla) {
    clone.info.sla.deliveryTime =
      (seed.info.sla?.deliveryTime ?? 25) + variant.deliveryDelta;
  }

  return clone;
};

/**
 * Generates the full fallback dataset: every seed across every branch
 * variant. With the current seeds (20) and variants (6) this yields 120
 * unique restaurants — comfortably above the 100-item target.
 */
const generateSampleRestaurants = () =>
  reslist.flatMap((seed) =>
    BRANCH_VARIANTS.map((_, variantIndex) => buildBranch(seed, variantIndex)),
  );

/** Memoized fallback dataset (≥100 items). */
export const SAMPLE_RESTAURANTS = generateSampleRestaurants();
