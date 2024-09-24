import { SparkleIcon } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full text-white z-50 absolute flex justify-center items-center bg-black bg-opacity-60">
      {" "}
      <div className=" mb-24">
        <SparkleIcon className="size-16 animate-ping" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
