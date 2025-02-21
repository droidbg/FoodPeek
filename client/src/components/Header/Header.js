import useOnlineStatus from "../../hooks/useOnlineStatus";
import logo from "/public/logo2.webp";
import { Link } from "react-router";

const Header = () => {
  const status = useOnlineStatus();
  const linkStyle =
    "m-2 hover:text-orange-600 hover:scale-105 text-sm md:text-lg";

  return (
    <div className="flex shadow-xl mb-1 justify-between bg-gradient-to-br sticky backdrop-blur top-0 transition-[background-color] z-10">
      <div>
        <Link to="/">
          <div className="my-1 flex items-center">
            <img className="logo-img h-10 sm:h-14 md:h-20 ml-4" src={logo} />
            <div className="font-medium text-sm sm:text-lg md:text-xl bg-[#fdf2f8] bg-opacity-20 rounded ml-2">
              ZONION
            </div>
          </div>
        </Link>
      </div>
      <div>
        <ul className="flex m-2 p-4">
          <li className="m-2 hover:cursor-default hidden sm:flex ">
            {status ? (
              <>
                <span className="md:flex hidden pr-1">Online ⇝ </span>
                🟢
              </>
            ) : (
              <>
                <span className="md:flex hidden pr-1 ">Offline ⇝ </span>🔴
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
