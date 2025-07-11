import React from "react";

const DeviceIndicator = () => {
  return (
    <div className="right-4 bottom-4 z-50 fixed flex justify-center items-center">
      <div className="flex justify-center items-center bg-black pb-1 rounded-full size-10 font-sans text-white text-lg">
        <span className="md:hidden lg:hidden block">sm</span>
        <span className="hidden lg:hidden md:block">md</span>
        <span className="hidden lg:block">lg</span>
      </div>
    </div>
  );
};

export default DeviceIndicator;
