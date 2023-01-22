import React from "react";
import GalleryItem from "@/components/ui/GalleryItem";

const Inventory = () => {
  return (
    <div className="flex space-y-2 flex-col items-center justify-start h-screen bg-black">
      <div className="flex items-end justify-start space-x-6 mt-14 w-screen overflow-visible h-fit">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-10 overflow-visible bg-cover bg-repeat h-14 ml-24">
          Inventory
        </h1>
        <h5 className="text-2xl text-gray-500">0x wallet address</h5>
      </div>
      <div className="bg-gradient-to-r from-fuchsia-600 to-blue-10 h-2 w-screen"></div>
      <div>
        <GalleryItem />
      </div>
    </div>
  );
};

export default Inventory;
