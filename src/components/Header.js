import { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  const onClickHandler = () => {
    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
  };

  return (
    <div className="heading">
      <div className="logo">
        <img className="logo-img" src={logo} />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
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
