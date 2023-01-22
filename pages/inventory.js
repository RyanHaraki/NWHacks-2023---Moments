import { useEffect, React, useState } from "react";
import GalleryItem from "@/components/ui/GalleryItem";
import { useAccount } from "wagmi";

const Inventory = () => {
  const [user, setUser] = useState("0x");
  const { address, isConnected } = useAccount();

useEffect(() => {
  if (isConnected) {
   setUser(localStorage.getItem("address"));
  }
}, [])

  // check to see if there is a user on page load. if not redirect to "/"
  // render the actual wallet from localstorage

  return (
    <div className="flex space-y-2 flex-col items-center justify-start h-screen bg-black overflow-auto">
      <div className="flex items-end justify-start space-x-6 mt-14 w-screen h-fit">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-10 bg-cover bg-repeat h-14 ml-24">
          Inventory
        </h1>
        <h5 className="text-2xl text-gray-500">{user}</h5>
      </div>
      <div className="bg-gradient-to-r from-fuchsia-600 to-blue-10 h-2 w-screen"></div>
      <div className="grid grid-cols-1 gap-y-20 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-10 w-screen ml-48">
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
      </div>
    </div>
  );
};

export default Inventory;
