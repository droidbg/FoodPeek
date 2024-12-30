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
    <div className="heading">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={logo} />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status: {status ? "🟢 " : " 🔴 "}</li>

          <li>
            <Link to="/" className="link-tag">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link-tag">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-tag">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link-tag">
              Cart
            </Link>
          </li>
          <button className="login-button" onClick={onClickHandler}>
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
