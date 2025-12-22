import { Outlet } from "react-router-dom";

export default function FullWidthLayout() {
  return (
    <div className="w-screen h-screen bg-[#F1F5F5] font-poppins">
      <div className="w-full h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
