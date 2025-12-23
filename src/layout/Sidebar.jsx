import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/tp-logo.jpg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reduxStore/action/auth";

const menuList = [
  {
    title: "Quality Assurance",
    icon: "icon-park-outline:success",
    route: "quality-assurance",
    submenu: [
      { title: "Evaluate Tickets", route: "evaluate-tickets" },
      // { title: "Ticket History", route: "ticket-history" },
      // { title: "Shadowing Form", route: "shadowing-form" },
      { title: "Forms Management", route: "forms-management" },
    ],
  },
];

const allStatus = [
  { title: "Online", color: "#69C920" },
  { title: "Break", color: "#9C27B0" },
  { title: "Away", color: "#FBC02D" },
  { title: "Offline", color: "#879EB2" },
];

export default function Sidebar() {
  const [activeStatus] = useState(allStatus[0]);
  const [openMenu, setOpenMenu] = useState(null);
  const [isPopover, setIsPopover] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userData = JSON.parse(localStorage.getItem("user_details"));

  const toggleSubmenu = (index, hasSubmenu, route) => {
    if (hasSubmenu) {
      setOpenMenu(openMenu === index ? null : index);
    } else {
      navigate(route);
    }
  };
  useEffect(() => {
    menuList.forEach((item, index) => {
      if (item.submenu?.some((sub) => `/${sub.route}` === pathname)) {
        setOpenMenu(index); // auto open submenu parent
      }
    });
  }, [pathname]);
  return (
    <div className="h-screen w-full bg-[#FFFFFF] border-r border-[#ECF2F9] relative">
      <img src={logo} className="w-[131px] mx-[10px] pt-4" />

      <div className="w-full border border-[#EBF3F4] mt-5"></div>

      {/* MENU */}
      <div className="mt-5 flex flex-col items-start">
        {menuList.map((item, index) => {
          const isActive = pathname === `/${item.route}`;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isOpen = openMenu === index;

          return (
            <div key={index} className="w-full">
              <div
                className={`flex items-center justify-between m-2 px-5 py-3 rounded-lg w-[95%] cursor-pointer 
                text-[#163143] 
                ${isActive ? "bg-[#ECF2F9]" : "bg-transparent"}
                hover:bg-[#ECF2F9]`}
                onClick={() => toggleSubmenu(index, hasSubmenu, item.route)}
              >
                <div className="flex items-center">
                  <Icon icon={item.icon} className="text-[24px]" />
                  <span className="text-[14px] ml-2">{item.title}</span>
                </div>

                {hasSubmenu && (
                  <Icon
                    icon="mdi:chevron-down"
                    className={`text-[20px] transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </div>

              {/* SUBMENU */}
              {hasSubmenu && isOpen && (
                <div className="ml-12 mt-1 flex flex-col">
                  {item.submenu.map((sub, i) => {
                    const subActive = pathname === `/${sub.route}`;
                    return (
                      <div
                        key={i}
                        onClick={() => navigate(sub.route)}
                        className={`px-3 py-3 mr-3 mt-1 rounded-[8px] cursor-pointer text-sm 
                          ${
                            subActive
                              ? "bg-[#DBFFDF] text-[#163143] shadow-[0_3px_12px_0_rgba(0,0,0,0.12)]"
                              : "text-[#163143]"
                          } 
                          hover:bg-[#ECF2F9]`}
                      >
                        {sub.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      {isPopover && (
        <div
          className="flex items-center absolute bottom-20 left-0 w-full p-6 bg-white bg-white border-t border-[#EBF3F4] cursor-pointer"
          onClick={() => dispatch(logout(navigate))}
        >
          <Icon
            icon="tabler:logout-2"
            className="text-[16px]"
            style={{ color: "#163143" }}
          />
          <span className="text-[#163143] text-[14px] ml-1 font-Poppins">
            Logout
          </span>
        </div>
      )}
      {/* shadow-[0_-2px_8px_rgba(0,0,0,0.08)] rounded-t-2xl */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-[#EBF3F4]">
        <div className="flex items-center gap-[20px] w-full">
          <div className="w-[57px] h-[57px] rounded-full bg-[#394E5E] text-white flex items-center justify-center text-md">
            {userData?.name?.charAt(0)}
          </div>

          <span className="text-[#394E5E] font-semibold text-[16px] font-Poppins">
            {userData?.name}
          </span>

          <div
            className="flex items-center ml-[auto]"
            onClick={() => setIsPopover(!isPopover)}
          >
            <Icon
              icon="mdi:chevron-down"
              className={`text-[20px] transition-transform ml-auto ${
                isPopover ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>
      <div class="fixed bottom-2 right-2 p-2 bg-black text-white text-xs rounded">
        <span class="sm:hidden md:hidden lg:hidden xl:hidden">xs</span>
        <span class="hidden sm:inline md:hidden lg:hidden xl:hidden">sm</span>
        <span class="hidden md:inline lg:hidden xl:hidden">md</span>
        <span class="hidden lg:inline xl:hidden">lg</span>
        <span class="hidden xl:inline">xl</span>
      </div>
    </div>
  );
}
