import { NavBar, SideBar } from "components";
import React from "react";

const MainPage = () => {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <div className="flex flex-col w-full">
        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;
