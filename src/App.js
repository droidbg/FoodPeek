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
import Header from "./components/Header";
import Body from "./components/Body";
const rootElemenent = document.getElementById("root");
const root = ReactDOM.createRoot(rootElemenent);

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Body />
    </div>
  );
};
root.render(<AppLayout />);
