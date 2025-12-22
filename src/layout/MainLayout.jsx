import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex w-screen h-screen bg-[#F1F5F5] font-poppins">
      <div className="w-[20%] md:w-[22%] lg:w-[22%] xl:w-[18%]">
        <Sidebar />
      </div>

      <div className="w-[80%] md:w-[78%] lg:w-[78%] xl:w-[82%] h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
