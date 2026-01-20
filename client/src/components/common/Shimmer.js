const Shimmer = () => {
  return (
    <div className="shimmer-container flex flex-wrap">
      {[...Array(30)].map((_, index) => (
        <div key={index} className="shimmer-card m-5">
          <div className="h-48 w-64 animate-pulse bg-[#dad1d1]"></div>
          <div className="mt-2 h-2 w-56 bg-[#e3e0e0]"></div>
          <div className="mt-2 h-2 w-56 bg-[#eae8e8]"></div>
          <div className="mt-2 h-2 w-24 animate-pulse bg-[#e3e0e0]"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
