import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
const logo = new URL("../../../assets/logo.png", import.meta.url).href;

const Header = () => {
  const status = useOnlineStatus();
  const { count } = useCart();
  const linkStyle =
    "m-2 hover:text-orange-600 hover:scale-105 text-sm md:text-lg";

  return (
    <div
      data-app-header
      className="sticky top-0 z-10 mb-1 flex items-center justify-between bg-gradient-to-br shadow-xl backdrop-blur transition-[background-color]"
    >
      <div>
        <Link to="/">
          <div className="my-1 flex items-center">
            <img
              className="logo-img r ml-4 h-10 to-pink-500 p-1 sm:h-14 md:h-18"
              src={logo}
              alt="FoodPeek Logo"
            />
            <div className="bg-opacity-20 ml-2 rounded bg-[#fdf2f8] text-sm font-medium sm:text-lg md:text-xl">
              FoodPeek
            </div>
          </div>
        </Link>
      </div>
      <div>
        <ul className="m-2 flex p-4">
          <li className="m-2 hidden hover:cursor-default sm:flex">
            {status ? (
              <>
                <span className="hidden pr-1 md:flex">Online ⇝ </span>
                🟢
              </>
            ) : (
              <>
                <span className="hidden pr-1 md:flex">Offline ⇝ </span>🔴
              </>
            )}
          </li>

          <li className={linkStyle}>
            <Link to="/" className="link-tag">
              Home
            </Link>
          </li>
          <li className={linkStyle}>
            <Link to="/about" className="link-tag">
              About
            </Link>
          </li>
          <li className={linkStyle}>
            <Link to="/contact" className="link-tag">
              Contact Us
            </Link>
          </li>
          <li className={linkStyle}>
            <Link
              to="/cart"
              className="link-tag relative inline-flex items-center"
            >
              Cart
              {count > 0 ? (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1.5 text-xs font-bold text-white">
                  {count}
                </span>
              ) : null}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
