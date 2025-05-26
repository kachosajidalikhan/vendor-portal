import { Menu, X, Search } from "lucide-react";
import icons from "../constants";
import { NavLink } from "react-router-dom";


export default function Header({ title, lazeez, isSidebarOpen, toggleSidebar }) {
  return (
    <header className="flex justify-between items-center pb-6 mb-4 border-b border-[#E6EFF5]">
      <div className="flex items-center gap-2">
        {/* <button
          onClick={toggleSidebar}
          className="lg:hidden text-[#ED004F] focus:outline-none"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button> */}
        <h2 className="text-2xl font-bold text-pink-600">{title}</h2>
        {lazeez && (<span className="text-2xl Sunkids text-black">{lazeez}</span>)}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E72765]" />
          <input
            type="text"
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 rounded-full bg-[#F2C4C7] text-sm text-[#E72765] w-64 focus:outline-none"
          // value={searchQuery}
          // onChange={onSearch}
          />
        </div>
        <div className="relative flex flex-col justify-center">
          <NavLink to={"/food-list"}>
            {({ isActive }) => (
              <>
                <button className="w-10 h-10 rounded-full bg-[#F2C4C7] flex items-center justify-center text-pink-600">
                  <img src={icons.FoodIcon} className="w-5 h-5" />
                </button>
                <span className={`absolute -bottom-2 h-1 w-9 left-0 right-0 m-auto bg-pink-600 rounded-br-2xl rounded-bl-2xl transition-opacity duration-2000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
              </>
            )}
          </NavLink>
        </div>
        <div className="relative flex flex-col">
          <NavLink to={'/lazeez-notifications'}>
            {({ isActive }) => (
              <>
                <button className="w-10 h-10 rounded-full bg-[#F2C4C7] flex items-center justify-center text-pink-600">
                  <img src={icons.NotificationIcon} alt="" className="w-6 h-6" />
                </button>
                <span className={`absolute -bottom-2 h-1 w-9 bg-pink-600 rounded-br-2xl rounded-bl-2xl transition-opacity duration-2000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
} 