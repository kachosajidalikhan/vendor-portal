import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const DashboardLayout = () => {
    return (
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar />
            <div className="overflow-y-auto">
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
