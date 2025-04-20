import React from "react";
import loadingGif from "../assets/loading.webp"; 

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-black via-neutral-900 to-black">
      <div className="flex flex-col items-center">
        <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
        <p className="mt-4 text-white text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;