import useOnlineStatus from "../../hooks/useOnlineStatus";
import logo from "/public/logo2.webp";
import { Link } from "react-router";

const Header = () => {
  const status = useOnlineStatus();
  const linkStyle = "m-2 hover:text-orange-600 hover:scale-105";

  return (
    <div className=" flex shadow-xl mb-1 justify-between bg-gradient-to-br z-fixed sticky backdrop-blur top-0 transition-[background-color] z-10 ">
      <div className="my-1 flex items-center">
        <Link to="/">
          <img className="logo-img h-20 ml-5" src={logo} />
        </Link>
        <span className="font-medium text-xl bg-[#fdf2f8] bg-opacity-20 rounded p-1">
          ZONION
        </span>
      </div>
      <div>
        <ul className="flex m-2 p-4">
          <li className="m-2 hover:cursor-default">
            Online ⇝ {status ? "🟢 " : " 🔴 "}
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
