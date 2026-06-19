/**
 * Sample Menu Data (Fallback)
 *
 * A realistic restaurant menu shaped to match exactly what `hooks/useMenu`
 * returns to the Menu page: a flattened object with restaurant info plus a
 * `filterCategory` array whose entries are `{ card: { card: { categoryId,
 * title, itemCards } } }` and whose items are `{ card: { info } }`.
 *
 * Used as a graceful fallback when the menu API errors out or returns no
 * usable data. Item `imageId` is intentionally left empty so the UI renders
 * its built-in DEFAULT_FOOD_IMAGE instead of an invented (broken) URL.
 */

/**
 * @param {string} id
 * @param {string} name
 * @param {number} priceInPaise - Price in paise (UI divides by 100).
 * @param {string} description
 * @param {boolean} isVeg
 */
const makeItem = (id, name, priceInPaise, description, isVeg) => ({
  card: {
    info: {
      id,
      name,
      price: priceInPaise,
      description,
      imageId: "", // falls back to DEFAULT_FOOD_IMAGE in MenuBody
      isVeg: isVeg ? 1 : 0,
    },
  },
});

/**
 * @param {string} categoryId
 * @param {string} title
 * @param {Array} itemCards
 */
const makeCategory = (categoryId, title, itemCards) => ({
  card: {
    card: {
      "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
      categoryId,
      title,
      itemCards,
    },
  },
});

const filterCategory = [
  makeCategory("cat-recommended", "Recommended", [
    makeItem(
      "item-1",
      "Paneer Butter Masala",
      29900,
      "Cottage cheese simmered in a rich, buttery tomato gravy.",
      true,
    ),
    makeItem(
      "item-2",
      "Butter Chicken",
      34900,
      "Tandoori chicken in a creamy makhani sauce, a house favourite.",
      false,
    ),
    makeItem(
      "item-3",
      "Veg Hakka Noodles",
      21900,
      "Wok-tossed noodles with crunchy vegetables and house sauces.",
      true,
    ),
    makeItem(
      "item-4",
      "Chicken Biryani",
      31900,
      "Long-grain basmati layered with spiced chicken and saffron.",
      false,
    ),
  ]),
  makeCategory("cat-starters", "Starters", [
    makeItem(
      "item-5",
      "Crispy Corn",
      18900,
      "Golden-fried sweet corn tossed with pepper and herbs.",
      true,
    ),
    makeItem(
      "item-6",
      "Chicken 65",
      26900,
      "Spicy, crispy fried chicken with curry leaves.",
      false,
    ),
    makeItem(
      "item-7",
      "Paneer Tikka",
      27900,
      "Char-grilled cottage cheese marinated in yogurt and spices.",
      true,
    ),
  ]),
  makeCategory("cat-breads", "Breads & Rice", [
    makeItem(
      "item-8",
      "Garlic Naan",
      7900,
      "Soft naan brushed with garlic and butter.",
      true,
    ),
    makeItem(
      "item-9",
      "Tandoori Roti",
      4900,
      "Whole-wheat flatbread from the tandoor.",
      true,
    ),
    makeItem(
      "item-10",
      "Jeera Rice",
      16900,
      "Steamed basmati tempered with cumin.",
      true,
    ),
  ]),
  makeCategory("cat-desserts", "Desserts", [
    makeItem(
      "item-11",
      "Gulab Jamun",
      12900,
      "Warm milk-solid dumplings in rose syrup.",
      true,
    ),
    makeItem(
      "item-12",
      "Choco Lava Cake",
      15900,
      "Molten chocolate cake with a gooey centre.",
      true,
    ),
  ]),
  makeCategory("cat-beverages", "Beverages", [
    makeItem(
      "item-13",
      "Masala Chaas",
      6900,
      "Spiced buttermilk, perfectly chilled.",
      true,
    ),
    makeItem(
      "item-14",
      "Sweet Lassi",
      9900,
      "Thick, creamy yogurt drink.",
      true,
    ),
    makeItem(
      "item-15",
      "Cold Coffee",
      13900,
      "Blended coffee with milk and ice.",
      true,
    ),
  ]),
];

/**
 * Sample menu shaped like the data `useMenu` builds for the page, plus
 * `isSample: true` so the page can flag it as fallback content. Fetch-state
 * fields (isLoading/isError) are intentionally left to the hook.
 */
export const SAMPLE_MENU = {
  name: "FoodPeek Kitchen (Sample)",
  avgRating: 4.4,
  totalRatingsString: "12K+",
  costForTwoMessage: "₹400 for two",
  cuisines: ["North Indian", "Chinese", "Desserts"],
  filterCategory,
  areaName: "Koramangala",
  locality: "Sample Locality",
  city: "Bengaluru",
  isSample: true,
};
