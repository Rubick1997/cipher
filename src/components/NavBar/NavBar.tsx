import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  return (
    <div className="bg-inherit h-fit p-4 flex">
      <div className="flex items-center gap-2 ml-auto ">
        <BellIcon className="h-4 w-4 text-black cursor-pointer  " />
        <img
          className="cursor-pointer inline-block h-8 w-8 rounded-full ring-black "
          src="https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png"
          alt="profile image"
        />
      </div>
    </div>
  );
};

export default NavBar;
