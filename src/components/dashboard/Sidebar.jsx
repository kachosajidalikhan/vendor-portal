import { X, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import icons from "../../constants/index";
import { useState, useEffect, useRef } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

export default function Sidebar({ onLinkClick, onClose, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Only for desktop
  const location = useLocation();
  const [barTop, setBarTop] = useState(0);
  const navRefs = useRef({});
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    onLinkClick(false);
  };

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
  ];

  useEffect(() => {
    const activeItem = navItems.find(item => {
      if (item.to === "/") return location.pathname === item.to;
      return location.pathname.startsWith(item.to);
    });

    if (activeItem && navRefs.current[activeItem.to]) {
      const itemElement = navRefs.current[activeItem.to];
      if (sidebarRef.current && itemElement) {
        const sidebarTop = sidebarRef.current.getBoundingClientRect().top;
        const itemTop = itemElement.getBoundingClientRect().top;
        setBarTop(itemTop - sidebarTop);
      }
    } else {
      setBarTop(-100);
    }
  }, [location.pathname]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`relative transition-all duration-300 
        ${isSidebarOpen ? "lg:w-68 w-full" : "lg:w-20 w-68"} 
        ml-6 lg:ml-0 bg-[#E5024E] lg:bg-white flex flex-col relative shadow-lg h-screen z-50`}
      >
        {/* Logo and Close Button */}
        <div className="flex bg-white items-center justify-between py-4 px-4">
          {isSidebarOpen ? (
            <img src={icons.Logo} alt="Logo" className="h-10" />
          ) : (
            <img src={icons.Logo3} alt="Small Logo" className="h-10 mx-auto" />
          )}

          {/* Close Button (Mobile Only) */}
          <div className="lg:hidden block">
            <button onClick={onClose}>
              <X className="w-6 h-6 text-pink-600 hover:text-pink-600" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 lg:px-1 mt-8 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label} className="relative" ref={el => navRefs.current[item.to] = el}>
                <NavLink
                  to={item.to}
                  onClick={onLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 px-4 font-medium transition-colors duration-150 ${isActive
                      ? "lg:text-pink-500 text-pink-200 border-l-4 rounded-l-sm"
                      : "lg:text-gray-500 text-white hover:bg-pink-50"
                    }`
                  }
                  end={item.to === "/"}
                >
                  {({ isActive }) => (
                    <>
                      <div className="w-5 h-5 flex items-center justify-center">
                        <img src={isActive ? item.iconActive : item.icon} alt="" className="w-5 h-5" />
                      </div>
                      <span className={`text-sm lg:text-lg transition-all duration-200 ${!isSidebarOpen ? 'hidden lg:hidden' : ''}`}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            {/* Logout Button */}
            <li className="relative">
              <button
                onClick={onLogout} // ✅ call passed logout function
                className="flex w-full items-center text-sm lg:text-lg gap-3 p-2 px-4 rounded-md font-medium transition-colors duration-150 lg:text-gray-500 text-pink-200 hover:bg-pink-50"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className={`${!isSidebarOpen ? 'hidden lg:hidden' : ''}`}>Logout</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Help Centre */}
        <div className={`p-4  ${!isSidebarOpen ? 'justify-center' : ''}`}>
          <div className={`p-4 ${!isSidebarOpen ? 'justify-center' : ''}`}>
            <div className="flex items-center gap-2 lg:text-gray-500 text-white">
              <FiHelpCircle className="w-5 h-5" />
              {isSidebarOpen && <span>Help Centre</span>}
            </div>
          </div>
        </div>

      </div>

      {/* Collapse/Expand Arrow (Desktop Only) */}
      <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute -right-10 lg:block hidden bg-[#EE6295] rounded-r-2xl top-25 p-4 border-r border-[#E6EFF5]">
        <button

          className="flex items-center gap-2 text-white hover:text-pink-600 transition"
        >
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${!isSidebarOpen ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            {/* Left pointing arrow by default */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
