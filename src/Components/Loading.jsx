import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
      <span className="text-gray-900 text-2xl font-bold">Yükleniyor...</span>
    </div>
  );
};

export default Loading;
