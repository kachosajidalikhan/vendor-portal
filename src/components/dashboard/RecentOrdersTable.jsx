export default function RecentOrdersTable({ recentOrders }) {
  return (
    <div className="p-6 rounded-xl w-170">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg Poppins-bold text-[#f50057]">Recent Orders</h3>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-[#A80A43] border-b border-[#fcdde4]">
              <th className="pb-3 px-4 text-xs Poppins">Tracking no <span className="text-[#ee629575] text-[9px]">▼</span></th>
              <th className="pb-3 text-xs Poppins">Package Name <span className="text-[#ee629575] text-[9px]">▼</span></th>
              <th className="pb-3 text-xs Poppins">Price <span className="text-[#ee629575] text-[9px]">▼</span></th>
              <th className="pb-3 text-xs Poppins">Total Order <span className="text-[#ee629575] text-[9px]">▼</span></th>
              <th className="pb-3 text-xs text-center Poppins">Total Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {recentOrders.map((order,index) => (
              <tr key={order.id} className={`${index % 2 === 0 ? "bg-white" : "bg-[#FAFAFB]"} text-start px-2`}>
                <td className="py-2 px-4 w-35 text-[#333] font-medium rounded-l-md poppins">{order.id}</td>
                <td className="py-2 pr-4">
                  <div className="flex w-35 items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-[#f50057] flex items-center border justify-center text-white text-sm">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="text-[#333] poppins">{order.name}</span>
                  </div>
                </td>
                <td className="py-2 w-35  text-[#333] poppins">Rs. {order.price}</td>
                <td className="py-2 w-35 m-auto">
                  <div className="bg-[#f5005733] poppins text-[#f50057a6] text-xs w-1/2 font-bold px-3 py-2 rounded-md text-center">
                    {order.orders}
                  </div>
                </td>
                <td className="py-2 px-4 w-35 text-[#333] poppins text-center rounded-r-md">Rs. {order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 