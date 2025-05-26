import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/dashboard/Sidebar";
// import Header from "./components/dashboard/Header";
import Header from "./components/Header";

// Pages
import Dashboard from './pages/dashboard';
import ManageOrders from './pages/ManageOrders';
import Chats from "./pages/Chats";
import Notifications from "./pages/Notifications";
import LazeezNotifications from "./pages/LazeezNotifications";
import CreatePackage from "./pages/CreatePackage";
import PackageCreation from "./pages/packageCreation";
import EditPackage from "./pages/editPackage";
import CreateOffer from "./pages/CreateOffer";
import CreatingOfferPage from './components/CreateOffer/CreatingOffer';
import CreateOfferDetail from './components/CreateOffer/CreateOfferDetail';
import EditOfferPage from "./components/CreateOffer/EditOffer";
import FoodList from "./pages/menu";
import CreateMenuPage from "./components/Menu/CreateMenu";
import EditMenuPage from "./components/Menu/editmenu";
import TrackPayments from "./pages/TrackPayments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Setting";
import MessagePage from './pages/MessagePage';
import OrderDetail from './pages/orderDetail';

function LayoutWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
    fixed inset-y-0 -left-6 z-30 w-[250px] bg-white shadow-md transition-transform transform
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:inset-0
  `}
      >
        <Sidebar onLinkClick={() => setIsSidebarOpen(false)} onClose={() => setIsSidebarOpen(false)} />

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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWithSidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="manage-orders/order-detail" element={<OrderDetail />} />
          <Route path="chats" element={<Chats />} />
          <Route path="chats/messages/:id" element={<MessagePage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="lazeez-notifications" element={<LazeezNotifications />} />
          <Route path="create-package" element={<CreatePackage />} />
          <Route path="create-package/package-creation" element={<PackageCreation />} />
          <Route path="create-package/edit-package" element={<EditPackage />} />
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
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
