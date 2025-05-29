import CircleProgress from "./CircleProgress";

export default function AnalyticsChart({ analyticsData }) {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-pink-600 poppins">Analytics</h3>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>
      <div className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <CircleProgress data={analyticsData} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl Poppins-bold text-gray-900 poppins">
              {Math.round((analyticsData.sales / (analyticsData.sales + analyticsData.cancel + analyticsData.refund)) * 100)}%+
             
            </div>
            <div className="text-base text-gray-400 mt-1">Sales</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-8">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#ED004F] inline-block"></span>
          <span className="font-medium text-gray-700 Poppins">Sale</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#CD084F] inline-block"></span>
          <span className="font-medium text-gray-700 Poppins">Cancel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#EE6295] border border-gray-200 inline-block"></span>
          <span className="font-medium text-gray-700 Poppins">Return</span>
        </div>
      </div>
    </div>
  );
} 