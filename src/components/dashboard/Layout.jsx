import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-[250px_1fr]">
            {/* Mobile Header with toggle */}
            {/* <div className="flex items-center justify-between p-4 lg:hidden bg-[#ED004F] text-white">
                <h1 className="text-lg font-bold">Vendor Portal</h1>
            </div> */}
                <button
                className="absolute top-7 left-7 z-50 lg:hidden text-white focus:outline-none" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

            {/* Sidebar */}
            <div
                className={`
                    absolute lg:static top-0 -left-2 h-full bg-white shadow-md z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:block w-[250px]
                `}
            >
                <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="bg-gray-50">
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardLayout;
