import logo from "/public/logo2.webp";
const ImageSection = () => {
  return (
    <div className="w-24">
      <div className="bg-white rounded-xl h-20 w-20 m-2 min-w-[80px] min-h-[80px]">
        <img src={logo} className="h-20 p-2" />
      </div>
      <div className="text-center mt-1">Zonion Food Delivery</div>
    </div>
  );
};

export default ImageSection;
