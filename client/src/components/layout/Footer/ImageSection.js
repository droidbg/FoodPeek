import logo from "/public/logo.png";
const ImageSection = () => {
  return (
    <div className="w-24">
      <div className="m-2 h-20 min-h-[80px] w-20 min-w-[80px] rounded-xl bg-white">
        <img src={logo} className="h-20 p-2" />
      </div>
      <div className="mt-1 text-center">FoodPeek Food Delivery</div>
    </div>
  );
};

export default ImageSection;
