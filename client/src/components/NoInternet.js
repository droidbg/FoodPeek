const NoInternet = () => {
  return (
    <div className="text-center pt-10 bg-pink-200 h-full">
      <div className="text-6xl mb-2 ">WHOOPS!</div>
      <div className="text-2xl my-3">SLOW OR NO INTERNET CONNECTION!</div>
      <div>Please check your internet/mobile data and try again</div>

      <button
        className="border border-black rounded-xl text-white bg-black p-2 mt-10"
        onClick={() => window.location.reload()}
      >
        REFRESH
      </button>
    </div>
  );
};
export default NoInternet;
