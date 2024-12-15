import { useState } from "react";
import logo from "../../images/logo.png";

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
          <li>Home</li>
          <li>About</li>
          <li>Cart</li>
          <button className="login-button" onClick={onClickHandler}>
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
