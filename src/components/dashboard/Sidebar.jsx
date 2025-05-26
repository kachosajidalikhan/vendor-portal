import { NavLink, useLocation } from "react-router-dom";
import icons from "../../constants/index";
import { useState, useEffect, useRef } from 'react';
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: icons.HomeIcon, iconActive: icons.HomeIconActive, to: "/" },
    { label: "Manage Orders", icon: icons.ManageOrderIcon, iconActive: icons.ManageOrderIconActive, to: "/manage-orders" },
    { label: "Chats", icon: icons.ChatsIcon, iconActive: icons.ChatsIconActive, to: "/chats" },
    { label: "Notifications", icon: icons.Notifications, iconActive: icons.NotificationsActive, to: "/notifications" },
    { label: "Create a Package", icon: icons.CreatePackageIcon, iconActive: icons.CreatePackageIconActive, to: "/create-package" },
    { label: "Create an Offer", icon: icons.CreateOfferIcon, iconActive: icons.CreateOfferIconActive, to: "/create-offer" },
    { label: "Track Payments", icon: icons.TrackPayments, iconActive: icons.TrackPaymentsActive, to: "/track-payments" },
    { label: "Analytics", icon: icons.AnalyticsIcon, iconActive: icons.AnalyticsIconActive, to: "/analytics" },
    { label: "Setting", icon: icons.SettingsIcon, iconActive: icons.SettingsIconActive, to: "/settings" },
    // { label: "Logout", icon: LogOut, iconActive: LogOut, to: "/" },
  ];

  const location = useLocation();
  const [barTop, setBarTop] = useState(0);
  const navRefs = useRef({});
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Find the ref for the active link
    const activeItem = navItems.find(item => {
      // For root path, match exactly
      if (item.to === "/") return location.pathname === item.to;
      // For other paths, match if current path starts with the item's path
      return location.pathname.startsWith(item.to);
    });
    
    if (activeItem && navRefs.current[activeItem.to]) {
      const itemElement = navRefs.current[activeItem.to];
      if (sidebarRef.current && itemElement) {
         // Calculate the top position relative to the sidebar
         const sidebarTop = sidebarRef.current.getBoundingClientRect().top;
         const itemTop = itemElement.getBoundingClientRect().top;
         setBarTop(itemTop - sidebarTop);
      }
    } else {
      // Handle initial state or no active link scenario
       setBarTop(-100); // Move it off-screen or handle as needed
    }
  }, [location.pathname, navItems]); // Recalculate when location or navItems change

  return (
    <div ref={sidebarRef} className="w-64 bg-white flex flex-col relative">
      <div className="p-4 ">
        <h1 className="text-xl font-bold text-pink-600">Logo here</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2 pt-15">
          {navItems.map((item) => (
            <li key={item.label} className="relative" ref={el => navRefs.current[item.to] = el}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md font-medium transition-colors duration-150 ${isActive
                    ? "text-pink-600"
                    : "text-gray-500 hover:bg-pink-50"
                  }`
                }
                isActive={(match, location) => {
                  if (!match) return false;
                  // For the root path, only match exact
                  if (item.to === "/") return match.isExact;
                  // For other paths, match if the current path starts with the item's path
                  return location.pathname.startsWith(item.to);
                }}
                end={item.to === "/"}
              >
                {({ isActive }) => (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img src={isActive ? item.iconActive : item.icon} alt="" className="w-5 h-5" />
                    </div>
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li className="relative">
            
          <NavLink
                to='/'
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md font-medium transition-colors duration-150 ${isActive
                    ? "text-pink-600"
                    : "text-gray-500 hover:bg-pink-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center">
                      {/* <img src={isActive ? item.iconActive : item.icon} alt="" className="w-5 h-5" /> */}
                      <LogOut className="w-5 h-5"/>
                    </div>
                    Logout
                  </>
                )}
              </NavLink>
                </li>
        </ul>
      </nav>




       {/* Single pink bar with dynamic top position and transition */}
       <span
         className="absolute left-0 h-9 w-1 bg-pink-600 rounded-tl-sm rounded-bl-sm rounded-tr-2xl rounded-br-2xl transition-all duration-500 ease-in-out"
         style={{ top: `${barTop}px` }}
       ></span>
      <div className="mt-auto p-4 border-r border-[#E6EFF5]">
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          Help Centre
        </div>
      </div>
    </div>
  );
} 