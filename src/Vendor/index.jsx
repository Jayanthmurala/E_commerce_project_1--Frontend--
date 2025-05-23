import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className=" container flex h-screen ">
      <div className="hidden sm:block w-1/6  p-4 bg-amber-200 shadow-blue-400">
        <SideBar />
      </div>
      <div className="w-full sm:w-5/6 p-4 bg-amber-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
