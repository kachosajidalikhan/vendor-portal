import SalesChart from "./SalesChart";

export default function ReportsChart() {
  return (
    <div className="px-1">
      <div className="flex justify-between items-center mb-6 px-6">
        <h3 className="text-lg font-bold text-pink-600 poppins">Report</h3>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>
      <div className="relative h-64 w-150">
        <SalesChart />
      </div>
    </div>
  );
} 