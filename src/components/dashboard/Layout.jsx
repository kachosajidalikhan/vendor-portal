import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col lg:grid lg:grid-cols-[250px_1fr]">
            {/* Mobile Header with toggle */}
            <div className="flex items-center justify-between p-4 lg:hidden bg-[#ED004F] text-white">
                <h1 className="text-lg font-bold">Vendor Portal</h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:static top-0 left-0 h-full bg-white shadow-md z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:block w-[250px]
                `}
            >
                <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
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
