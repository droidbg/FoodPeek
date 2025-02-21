import useOnlineStatus from "../../hooks/useOnlineStatus";
import logo from "/public/logo2.webp";
import { Link } from "react-router";

const Header = () => {
  const status = useOnlineStatus();
  const linkStyle =
    "m-2 hover:text-orange-600 hover:scale-105 text-sm md:text-lg";

  return (
    <div className="sticky top-0 z-10 mb-1 flex justify-between bg-gradient-to-br shadow-xl backdrop-blur transition-[background-color]">
      <div>
        <Link to="/">
          <div className="my-1 flex items-center">
            <img className="logo-img ml-4 h-10 sm:h-14 md:h-20" src={logo} />
            <div className="ml-2 rounded bg-[#fdf2f8] bg-opacity-20 text-sm font-medium sm:text-lg md:text-xl">
              ZONION
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
            <Link to="/cart" className="link-tag">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
