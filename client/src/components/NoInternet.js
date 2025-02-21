const NoInternet = () => {
  return (
    <div className="h-full bg-pink-200 pt-10 text-center">
      <div className="mb-2 text-6xl">WHOOPS!</div>
      <div className="my-3 text-2xl">SLOW OR NO INTERNET CONNECTION!</div>
      <div>Please check your internet/mobile data and try again</div>

      <button
        className="mt-10 rounded-xl border border-black bg-black p-2 text-white"
        onClick={() => window.location.reload()}
      >
        REFRESH
      </button>
    </div>
  );
};
export default NoInternet;
