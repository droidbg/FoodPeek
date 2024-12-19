export const IMAGES_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const PROXY_URL = "https://proxy.cors.sh/";
export const RESTAURANT_LIST_URL =
  PROXY_URL +
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999";

export const RESTAURANT_MENU_URL =
  PROXY_URL +
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532";
