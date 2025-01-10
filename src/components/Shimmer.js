const Shimmer = () => {
  return (
    <div className="shimmer-container flex flex-wrap">
      {[...Array(30)].map((_, index) => (
        <div key={index} className="shimmer-card m-5">
          <div className="bg-[#ebeaea] w-64 h-48 "></div>
          <div className="bg-[#e3e0e0] w-56 h-2 mt-2"></div>
          <div className="bg-[#eae8e8] w-56 h-2 mt-2"></div>
          <div className="bg-[#e3e0e0] w-24 h-2 mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
