import { MessageSquare, Package, Users } from "lucide-react";
import icons from "../../constants/index";
import { Link } from "react-router-dom";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
        <Link to="/chats">
      <div className="rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
          {/* <MessageSquare className="w-6 h-6" /> */}
          <img src={icons.MessageIcon} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl Poppins-bold">{stats.messages}+</h3>
          <p className="text-sm text-gray-500">New messages</p>
        </div>
      </div>
        </Link>
      <Link to="/create-package">
      <div className="rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
          {/* <Package className="w-6 h-6" /> */}
          <img src={icons.PackagesIcon} alt="" className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl Poppins-bold">{stats.packages}+</h3>
          <p className="text-sm text-gray-500">Packages</p>
        </div>
      </div>
      </Link>
      <Link to="/analytics">
      <div className="rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
          {/* <Package className="w-6 h-6" /> */}
          <img src={icons.BagIcon} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl Poppins-bold">{stats.soldPackages}+</h3>
          <p className="text-sm text-gray-500">Sell Packages</p>
        </div>
      </div>
      </Link>

      <Link to="/analytics">
      <div className="rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
          {/* <Users className="w-6 h-6" /> */}
          <img src={icons.NewCustomerIcon} alt="" className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl Poppins-bold">{stats.newCustomers}+</h3>
          <p className="text-sm text-gray-500">New Customers</p>
        </div>
      </div>
      </Link>
    </div>
  );
} 