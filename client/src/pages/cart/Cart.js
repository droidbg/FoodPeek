import cart from "../../../public/cart.svg";
const Cart = () => {
  return (
    <div className="flex items-center">
      <img src={cart} alt="Restaurant Logo" className="p-5" />
      <p className="text-5xl"> CART COMING SOON</p>
    </div>
  );
};

export default Cart;
