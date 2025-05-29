import { X, LogOut, HomeIcon } from "lucide-react"; // Import X icon
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import icons from "../../constants/index";
import { useState, useEffect, useRef } from 'react';

export default function Sidebar({ onLinkClick, onClose }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default open
  const location = useLocation();
  const [barTop, setBarTop] = useState(0);
  const navRefs = useRef({});
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

const handleLogout = () => {
  // ✅ Clear auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // ✅ App ke state ya parent ko inform karo (agar stage system use ho raha hai)
  if (onLinkClick) onLinkClick("login");

  // ✅ Navigate to login page
  // navigate("/login");
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

  if (!isSidebarOpen) return null; // Sidebar band hai to render mat karo

  return (
    <div ref={sidebarRef} className="lg:w-68 w-full ml-6 lg:ml-0 bg-[#E5024E] lg:bg-white flex flex-col relative shadow-lg h-screen z-50">

      {/* ❌ Close Button */}

      {/* Logo */}
      <div className="flex bg-white items-center justify-between py-4">
        {/* <h1 className="text-xl font-bold lg:text-pink-600 text-white">Logo here</h1> */}
        <img src={icons.Logo} alt="Logo" className="h-10 lg:h-full" />
        <div className="px-4  lg:hidden block">
          <button onClick={onClose}>
            <X className="w-6 h-6 text-pink-600 hover:text-pink-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 lg:px-1 mt-8 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label} className="relative" ref={el => navRefs.current[item.to] = el}>
              <NavLink
                to={item.to}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2  px-4 font-medium transition-colors duration-150 ${isActive
                    ? "lg:text-pink-500 text-pink-200 border-l-4 rounded-l-sm"
                    : "lg:text-gray-500 text-white hover:bg-pink-50"
                  }`
                }
                end={item.to === "/"}
              >
                {({ isActive }) => (
                  <>
                    <div className="w-5 text-white h-5 flex items-center justify-center">
                      <img src={isActive ? item.iconActive : item.icon} alt="" className={`w-5 h-5 ${isActive ? "text-white" : "text-black"}`} />
                    </div>

                    <span className="text-sm lg:text-lg">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}

          {/* Logout */}
          <li className="relative">
            <button
              onClick={handleLogout}
              className="flex w-full items-center text-sm lg:text-lg gap-3 p-2 px-4 rounded-md font-medium transition-colors duration-150 lg:text-gray-500 text-pink-200 hover:bg-pink-50"
            >
              <div className="w-5 lg:text-gray-500 text-white h-5 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Active Bar */}
      {/* <span
        className="absolute left-0 h-9 w-1 lg:bg-pink-600 bg-white rounded-tl-sm rounded-bl-sm rounded-tr-2xl rounded-br-2xl transition-all duration-500 ease-in-out"
        style={{ top: `${barTop}px` }}
      ></span> */}

      {/* Help Centre */}
      <div className="mt-auto p-4 border-r border-[#E6EFF5]">
        <div className="flex items-center gap-2 lg:text-gray-500 text-white">
          <svg
            className="w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
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