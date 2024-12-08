/**
 * AppLayout
 *   - Header
 *      - Logo
 *      - NavItems
 *          - Home, About, Cart
 *
 *   - Body
 *      - Search
 *      - AllRestrauntCompenent
 *          - ResturantCard
 *                 - Image
 *                 - Description
 *                 - Stars
 *   - Footer
 *      - Copyright
 *      - Links
 *
 */
import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./images/logo.png";
const rootElemenent = document.getElementById("root");
const root = ReactDOM.createRoot(rootElemenent);

const AllRestrauntCompenent = () => {
  return (
    <div className="restarunt-components">
      <div className="resturant-card"></div>
    </div>
  );
};
const Body = () => {
  return (
    <div className="body">
      <div>search</div>
      <AllRestrauntCompenent />
    </div>
  );
};
const Header = () => {
  return (
    <div className="heading">
      <div className="logo">
        <img src={logo} width={100}></img>
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

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Body />
    </div>
  );
};
root.render(<AppLayout />);
