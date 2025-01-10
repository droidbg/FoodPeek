import { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const status = useOnlineStatus();

  const onClickHandler = () => {
    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
  };

  return (
    <div className=" flex p-4  shadow-lg mb-2  justify-between bg-gradient-to-br from-[#ef6cb6] to-[#fc71c0]">
      <div className="w-20">
        <Link to="/">
          <img className="logo-img" src={logo} />
        </Link>
      </div>
      <div>
        <ul className="flex m-2 p-4">
          <li className="m-2">Online Status: {status ? "🟢 " : " 🔴 "}</li>

          <li className="m-2  hover:text-fuchsia-600">
            <Link to="/" className="link-tag">
              Home
            </Link>
          </li>
          <li className="m-2  hover:text-fuchsia-600">
            <Link to="/about" className="link-tag">
              About
            </Link>
          </li>
          <li className="m-2  hover:text-fuchsia-600">
            <Link to="/contact" className="link-tag">
              Contact Us
            </Link>
          </li>
          <li className="m-2  hover:text-fuchsia-600">
            <Link to="/cart" className="link-tag">
              Cart
            </Link>
          </li>
          <button
            className="m-2  hover:text-fuchsia-600"
            onClick={onClickHandler}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
