import logo from "../../images/logo.png";

const Header = () => {
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
        </ul>
      </div>
    </div>
  );
};
export default Header;
