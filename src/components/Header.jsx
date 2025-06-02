import { Menu, X, Search } from "lucide-react";
import icons from "../constants";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { useMemo } from "react";

export default function Header({ title, lazeez, isSidebarOpen, toggleSidebar }) {
  // const location = useLocation();
  const location = useLocation();
  const pathname = location.pathname;

  const pageTitles = {
    "/": "Dashboard",
    "/manage-orders": "Manage Orders",
    "/manage-orders/order-detail": "Order Detail",
    "/chats": "Chats",
    "/chats/messages": "Chat Messages",
    "/notifications": "Notifications",
    "/lazeez-notifications": "Notifications By",
    "/create-package": "Create Package",
    "/create-package/package-creation": "Package Creation",
    "/create-package/edit-package": "Edit Package",
    "/create-offer": "Create Offer",
    "/create-offer/creating-offer": "Creating Offer",
    "/create-offer/create-offer-detail": "Offer Detail",
    "/create-offer/edit-offer": "Edit Offer",
    "/food-list": "Vendor's Menu",
    "/food-list/create-menu": "Create Menu",
    "/food-list/edit-menu": "Edit Menu",
    "/track-payments": "Track Payments",
    "/analytics": "Analytics",
    "/settings": "Settings"
  };

  const currentPath = location.pathname;

  const pageTitle = useMemo(() => {
    if (currentPath.startsWith("/create-offer/create-offer-detail"))
      return "Offer Detail";
    if (currentPath.startsWith("/create-offer/edit-offer"))
      return "Edit Offer";
    if (currentPath.startsWith("/chats/messages"))
      return "Chat Messages";
    if (currentPath.startsWith("/manage-orders/order-detail"))
      return "Order Detail";

    return pageTitles[currentPath] || "Dashboard";
  }, [currentPath]);
  const isLazeezNotification = pathname.startsWith("/lazeez-notifications");

  return (
    <div className="w-full">
      <header className="flex w-full z-10 float-end fixed lg:relative h-14 lg:h-20 my-3 justify-between items-center lg:bg-white bg-[#EE6295] rounded-full lg:rounded-none px-4 md:px-10 lg:pb-6 lg:mb-4 border-b border-[#E6EFF5]">
        {/* === Left: Hamburger + Title === */}
        <div className="flex items-center gap-3">
          {/* Hamburger Toggle (only on mobile) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white focus:outline-none"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Page Title */}
          <h2 className="lg:text-2xl lg:flex block gap-5 items-center text-[16px] Poppins-bold text-white lg:text-pink-600 ml-1">
            {pageTitle}{" "}
            {isLazeezNotification && (
              <p className="text-lg text-black Sunkids leading-5">Lazeez Events</p>
            )}
          </h2>
        </div>

        {/* === Right: Search & Icons === */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search box (Only on large screens) */}
          <div className="relative hidden lg:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E72765]" />
            <input
              type="text"
              placeholder="Search for something"
              className="pl-10 pr-4 py-2 rounded-full bg-[#F2C4C7] text-sm text-[#E72765] w-64 focus:outline-none"
            />
          </div>

          {/* Food Icon */}
          <div className="relative flex flex-col justify-center">
            <NavLink to="/food-list">
              {({ isActive }) => (
                <>
                  <button className="lg:w-10 lg:h-10 w-7 h-7 rounded-full bg-[#F2C4C7] flex items-center justify-center text-pink-600">
                    <img src={icons.FoodIcon} className="lg:w-6 lg:h-6 w-5 h-5" alt="food" />
                  </button>
                  <span className={`absolute -bottom-2 h-1 w-7 left-0 right-0 m-auto bg-pink-600 rounded-br-2xl rounded-bl-2xl transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
                </>
              )}
            </NavLink>
          </div>

          {/* Notification Icon */}
          <div className="relative flex flex-col">
            <NavLink to="/lazeez-notifications">
              {({ isActive }) => (
                <>
                  <button className="lg:w-10 lg:h-10 w-7 h-7 rounded-full bg-[#F2C4C7] flex items-center justify-center text-pink-600">
                    <img src={icons.NotificationIcon} alt="notify" className="lg:w-6 lg:h-6 w-5 h-5" />
                  </button>
                  <span className={`absolute -bottom-2 lg:right-1 h-1 w-7 bg-pink-600 rounded-br-2xl rounded-bl-2xl transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      {/* spacing for fixed header */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
