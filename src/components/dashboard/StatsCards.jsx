import { Link } from "react-router-dom";
import icons from "../../constants/index";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <Link to="/chats">
        <div className="rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
            <img src={icons.MessageIcon} alt="Messages" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl Poppins-bold">{stats.messages}+</h3>
            <p className="text-sm text-gray-500">New messages</p>
          </div>
        </div>
      </Link>

      <Link to="/create-package">
        <div className="rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
            <img src={icons.PackagesIcon} alt="Packages" className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl Poppins-bold">{stats.packages}+</h3>
            <p className="text-sm text-gray-500">Packages</p>
          </div>
        </div>
      </Link>

      <Link to="/analytics">
        <div className="rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
            <img src={icons.BagIcon} alt="Sold Packages" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl Poppins-bold">{stats.soldPackages}+</h3>
            <p className="text-sm text-gray-500">Sell Packages</p>
          </div>
        </div>
      </Link>

      <Link to="/analytics">
        <div className="rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
            <img src={icons.NewCustomerIcon} alt="New Customers" className="w-6 h-6" />
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
