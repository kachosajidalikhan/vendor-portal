import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/loader/loader";
import LoginPage from "./components/login/login";
import Finalizing from "./components/finalizing/finalizing";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/Header";

// Pages
import Dashboard from './pages/dashboard';
import ManageOrders from './pages/ManageOrders';
import Chats from "./pages/Chats";
import Notifications from "./pages/Notifications";
import CreatePackage from "./pages/CreatePackage";
import CreateOffer from "./pages/CreateOffer";
import TrackPayments from "./pages/TrackPayments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Setting";
import MessagePage from './pages/MessagePage';
import CreatingOfferPage from './components/CreateOffer/CreatingOffer';
import CreateOfferDetail from './components/CreateOffer/CreateOfferDetail';
import EditOfferPage from "./components/CreateOffer/EditOffer";
import FoodList from "./pages/menu";
import CreateMenuPage from "./components/Menu/CreateMenu";
import PackageCreation from "./pages/packageCreation";
import EditPackage from "./pages/editPackage";
import OrderDetail from './pages/orderDetail';
import LazeezNotification from './pages/LazeezNotifications'

function LayoutWithSidebar({ onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 -left-6 z-30  bg-white shadow-md transition-transform transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <Sidebar onLogout={onLogout} onLinkClick={() => setIsSidebarOpen(false)} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState("login");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // or clear auth data if used
    setStage("login"); // 👈 Send the user back to login stage
  };

  if (loading) return <Loader />;

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>

          {/* Stage Based Routing */}
          <Route
            path="/*"
            element={
              <motion.div
                key={stage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {stage === "login" && <LoginPage onLoginSuccess={() => setStage("finalizing")} />}
                {stage === "finalizing" && <Finalizing onFinalizeComplete={() => setStage("done")} />}
              </motion.div>
            }
          />

          {/* Routes only accessible when logged in and finalized */}
          {stage === "done" && (
            <Route path="/" element={<LayoutWithSidebar onLogout={handleLogout} />}>
              <Route index element={<Dashboard />} />
              <Route path="/manage-orders" element={<ManageOrders />} />
              <Route path="/manage-orders/order-detail" element={<OrderDetail />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/messages/:id" element={<MessagePage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/lazeez-notifications" element={<LazeezNotification />} />
              <Route path="/create-package" element={<CreatePackage />} />
              <Route path="/create-package/package-creation" element={<PackageCreation />} />
              <Route path="/create-package/edit-package" element={<EditPackage />} />
              <Route path="/create-offer" element={<CreateOffer />} />
              <Route path="/create-offer/creating-offer" element={<CreatingOfferPage />} />
              <Route path="/create-offer/create-offer-detail/:id" element={<CreateOfferDetail />} />
              <Route path="/create-offer/edit-offer/:id" element={<EditOfferPage />} />
              <Route path="/food-list" element={<FoodList />} />
              <Route path="/food-list/create-menu" element={<CreateMenuPage />} />
              <Route path="/track-payments" element={<TrackPayments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          )}

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
