// Updated App.js for Web App with Responsive Sidebar
// Converted from Desktop-centric flow

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/loader/loader";
import LoginPage from "./components/login/login";
import Finalizing from "./components/finalizing/finalizing";
import DashboardLayout from './components/dashboard/Layout';

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
import CreatingOfferPage from './components/CreateOffer/CreatingOffer'
import CreateOfferDetail from './components/CreateOffer/CreateOfferDetail';
import EditOfferPage from "./components/CreateOffer/EditOffer";
import FoodList from "./pages/menu";
import CreateMenuPage from "./components/Menu/CreateMenu";
import PackageCreation from "./pages/packageCreation";
import EditPackage from "./pages/editPackage";
import OrderDetail from './pages/orderDetail';
import EditMenuPage from "./components/Menu/editmenu";
import LazeezNotifications from "./pages/LazeezNotifications";

function App() {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState("login");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <motion.div
              key={stage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {stage === "login" && <LoginPage onLoginSuccess={() => setStage("finalizing")} />}
              {stage === "finalizing" && <Finalizing onFinalizeComplete={() => setStage("done")} />}
              {stage === "done" && <DashboardLayout />}
            </motion.div>
          }>
            {stage === "done" && (
              <>
                <Route index element={<Dashboard />} />
                <Route path="manage-orders" element={<ManageOrders />} />
                <Route path="chats" element={<Chats />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="lazeez-notifications" element={<LazeezNotifications />} />
                <Route path="create-package" element={<CreatePackage />} />

                <Route path="create-offer" element={<CreateOffer />} />
                <Route path="create-offer/creating-offer" element={<CreatingOfferPage />} />
                <Route path="create-offer/create-offer-detail/:id" element={<CreateOfferDetail />} />
                <Route path="create-offer/edit-offer/:id" element={<EditOfferPage />} />

                <Route path="food-list" element={<FoodList />} />
                <Route path="food-list/create-menu" element={<CreateMenuPage />} />
                <Route path="food-list/edit-menu" element={<EditMenuPage />} />

                <Route path="track-payments" element={<TrackPayments />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="chats/messages/:id" element={<MessagePage />} />

                <Route path="create-package/package-creation" element={<PackageCreation />} />
                <Route path="create-package/edit-package" element={<EditPackage />} />
                <Route path="manage-orders/order-detail" element={<OrderDetail />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
