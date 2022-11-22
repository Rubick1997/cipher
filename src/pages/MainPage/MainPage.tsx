import { NavBar, PendingReqests, SideBar } from "components";

const MainPage = () => {
  return (
    <div className="flex w-full h-full">
      <div className="md:hidden">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <NavBar />
        <PendingReqests />
      </div>
    </div>
  );
};

export default MainPage;
