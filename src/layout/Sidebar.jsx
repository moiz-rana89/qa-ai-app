"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/tp-logo.jpg";
import { logout, logoutAction } from "../reduxStore/action/auth";
import { filterMenuByRole } from "../utils/roleHelpers";
import NeedHelpModal from "../components/NeedHelpModal";

const menuList = [
  {
    title: "Attendance Management",
    icon: "ri:team-line",
    route: "workforce-team-attendance",
    roles: [
      "dev",
      "csm",
      "cstm",
      "tl",
      "om",
      "som",
      "aom",
      "admin",
      "itl",
      "dd",
      "dm",
      "dtl",
      "qa-dm",
      "qa-tl",
    ],
    submenu: [
      {
        title: "Remote Team Management",
        route: "workforce-remote-team-attendance",
        roles: ["dev", "om", "som", "aom", "admin", "tl", "dtl"],
      },
      {
        title: "Remote Team Reporting",
        route: "workforce-remote-team-attendance-report",
        roles: ["dev", "csm", "om", "som", "aom", "admin", "tl", "dtl"],
      },
      {
        title: "Internal Team Management",
        route: "workforce-internal-team-attendance",
        roles: [
          "dev",
          "om",
          "som",
          "aom",
          "admin",
          "itl",
          "dm",
          "dd",
          "qa-dm",
          "qa-tl",
        ],
      },
      {
        title: "Internal Team Reporting",
        route: "workforce-internal-team-attendance-report",
        roles: [
          "dev",
          "om",
          "som",
          "aom",
          "admin",
          "itl",
          "dm",
          "dd",
          "qa-dm",
          "qa-tl",
        ],
      },
      {
        title: "Advance Notice",
        route: "advance-notice",
        roles: ["dev", "admin", "tl"],
      },
      {
        title: "Schedule Management",
        route: "schedule-management",
        roles: ["dev", "admin"],
      },
    ],
  },
  {
    title: "WFA Attendance Management",
    icon: "ri:team-line",
    route: "workforce-team-attendance",
    roles: ["dev", "wfa"],
    submenu: [
      {
        title: "Remote Team",
        route: "wfa-remote-team-attendance",
        roles: ["dev", "wfa"],
      },
      {
        title: "Internal Team",
        route: "wfa-internal-team-attendance",
        roles: ["dev", "wfa"],
      },
      {
        title: "Attendance Reporting",
        route: "wfa-attendance-reporting",
        roles: ["dev", "wfa"],
      },
    ],
  },
  {
    title: "Forms",
    icon: "mage:file-2",
    route: "forms",
    roles: [
      "dev",
      "qa-tl",
      "tl",
      "om",
      "admin",
      "csm",
      "cstm",
      "som",
      "aom",
      "dtl",
      "qas",
    ],
    submenu: [
      {
        title: "Ticket Monitoring Form",
        route: "ticket-monitoring-form",
        roles: [
          "dev",
          "qa-tl",
          "tl",
          "om",
          "admin",
          "csm",
          "cstm",
          "som",
          "aom",
          "dtl",
          "qas",
        ],
      },
      {
        title: "Performance Coaching Form",
        route: "performance-monitoring-form",
        roles: [
          "om",
          "som",
          "aom",
          "admin",
          "dev",
          "csm",
          "cstm",
          "qa-tl",
          "tl",
          "dtl",
          "qas",
        ],
      },
      {
        title: "Other Coaching Types",
        route: "other-coaching-types",
        roles: [
          "om",
          "som",
          "aom",
          "admin",
          "dev",
          "csm",
          "cstm",
          "qa-tl",
          "tl",
          "dtl",
          "qas",
        ],
      },
      {
        title: "Client Specific Forms",
        route: "custom-monitoring-form",
        roles: ["admin", "dev", "dtl", "om", "aom"],
      },
    ],
  },
  {
    title: "Reports",
    icon: "hugeicons:download-03",
    route: "reports",
    roles: ["admin", "dev", "qa-tl", "tl", "aom", "dtl", "wfa", "om", "qas"],
    submenu: [
      {
        title: "Download Ticket OR Performance Report",
        route: "download-report",
        roles: [
          "admin",
          "dev",
          "qa-tl",
          "tl",
          "aom",
          "dtl",
          "wfa",
          "om",
          "qas",
        ],
      },
      {
        title: "Download Client Specific Report",
        route: "download-client-specific-report",
        roles: [
          "admin",
          "dev",
          "dtl",
          "qa-tl",
          "tl",
          "aom",
          "wfa",
          "om",
          "qas",
        ],
      },
      {
        title: "QA AI Report",
        route: "qa-ai-report",
        roles: [
          "admin",
          "dev",
          "qa-tl",
          "tl",
          "aom",
          "dtl",
          "wfa",
          "om",
          "qas",
        ],
      },
    ],
  },
  {
    title: "Performance Review",
    icon: "carbon:dashboard",
    route: "performance-review",
    roles: ["admin", "dev", "tl"],
  },
  {
    title: "Quality Assurance",
    icon: "icon-park-outline:success",
    route: "quality-assurance",
    roles: ["admin", "dev", "qas", "tl", "dtl", "qa", "qa-dm", "qa-tl"],
    submenu: [
      {
        title: "Evaluate Tickets",
        route: "evaluate-tickets",
        roles: ["admin", "dev", "qas", "tl", "dtl", "qa", "qa-dm", "qa-tl"],
      },
      {
        title: "Forms Management",
        route: "forms-management",
        roles: ["admin", "dev", "qa", "qa-dm", "qa-tl", "qas"],
      },
      {
        title: "QA Settings",
        route: "qa-settings",
        roles: ["admin", "dev", "om", "qa", "qa-dm", "qa-tl"],
      },
    ],
  },
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [isPopover, setIsPopover] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // const user = JSON.parse(localStorage.getItem("user_details") || "{}");
  // const role = user?.role;

  const user = useSelector((state) => state.auth.user);
  const role = user?.role;
  useEffect(() => {
    if (role) {
      const filtered = filterMenuByRole(menuList, role);
      setFilteredMenu(filtered);
    }
  }, [role]);

  useEffect(() => {
    filteredMenu.forEach((item, index) => {
      if (item?.submenu?.some((sub) => `/${sub.route}` === pathname)) {
        setOpenMenu(index);
      }
    });
  }, [pathname, filteredMenu]);

  const toggleSubmenu = (index, hasSubmenu, route) => {
    if (hasSubmenu) {
      setOpenMenu(openMenu === index ? null : index);
    } else {
      navigate(route);
    }
  };

  // const handleLogout = () => {
  //   dispatch(logout(navigate));
  // };

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    dispatch(logoutAction());
    // navigate("/login");
  };

  return (
    <div className="h-screen w-full bg-[#FFFFFF] border-r border-[#ECF2F9] flex flex-col">
      {/* LOGO */}
      <img
        src={logo || "/placeholder.svg"}
        className="w-[131px] mx-[10px] pt-4"
        alt="Logo"
      />

      <div className="w-full border border-[#EBF3F4] mt-5"></div>

      {/* MENU (SCROLLABLE) */}
      <div
        className="mt-5 flex-1 flex flex-col items-start overflow-y-auto
    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {filteredMenu.map((item, index) => {
          const isActive = pathname === `/${item.route}`;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isOpen = openMenu === index;

          return (
            <div key={index} className="w-full">
              <div
                className={`flex items-center justify-between m-2 px-5 py-3 rounded-lg w-[95%] cursor-pointer 
              text-[#163143] 
              ${isActive ? "bg-[#ECF2F9]" : ""}
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
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

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

      {/* NEED HELP BUTTON */}
      <div className="px-4 pb-3">
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#86FE964D] hover:bg-[#86FE9680] text-[#163143] text-[14px] font-medium transition-all cursor-pointer"
        >
          <Icon icon="mdi:help-circle-outline" className="text-[18px]" />
          Need help?
        </button>
      </div>

      <NeedHelpModal
        open={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* LOGOUT POPOVER */}
      {isPopover && (
        <div
          className="flex items-center p-6 bg-white border-t border-[#EBF3F4] cursor-pointer"
          onClick={handleLogout}
        >
          <Icon icon="tabler:logout-2" className="text-[16px]" />
          <span className="text-[#163143] text-[14px] ml-1 font-Poppins">
            Logout
          </span>
        </div>
      )}

      {/* FOOTER (STICKS TO BOTTOM) */}
      <div className="p-4 bg-white border-t border-[#EBF3F4]">
        <div className="flex items-center gap-[20px] w-full">
          <div className="w-[57px] h-[57px] rounded-full bg-[#394E5E] text-white flex items-center justify-center">
            {user?.name?.charAt(0)}
          </div>

          <span className="text-[#394E5E] font-semibold text-[16px] font-Poppins">
            {user?.name}
          </span>

          <div
            className="ml-auto cursor-pointer"
            onClick={() => setIsPopover(!isPopover)}
          >
            <Icon
              icon="mdi:chevron-down"
              className={`text-[20px] transition-transform ${
                isPopover ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
