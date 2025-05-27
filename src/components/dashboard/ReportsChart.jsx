import SalesChart from "./SalesChart";

export default function ReportsChart() {
  return (
    <div className="px-2 sm:px-4 lg:px-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-pink-600 poppins">Report</h3>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>

      {/* For large screens: fixed width and height */}
      <div className="hidden lg:block w-[600px] h-[300px]">
        <SalesChart />
      </div>

      {/* For small/medium screens: full width and height */}
      <div className="block lg:hidden w-full h-64">
        <SalesChart />
      </div>
    </div>
  );
}
