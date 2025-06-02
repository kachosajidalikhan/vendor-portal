import { Download, Search } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import icons from "../constants"

// Default data for demonstration
const defaultMonthlyData = [
  { month: "Jul", Income: 120 },
  { month: "Aug", Income: 340 },
  { month: "Sep", Income: 250 },
  { month: "Oct", Income: 480 },
  { month: "Nov", Income: 780 },
  { month: "Dec", Income: 240 },
  { month: "Jan", Income: 580 }
]

const defaultWeeklyData = [
  { day: "Sat", orders: 450, packages: 230 },
  { day: "Sun", orders: 340, packages: 120 },
  { day: "Mon", orders: 310, packages: 250 },
  { day: "Tue", orders: 460, packages: 350 },
  { day: "Wed", orders: 140, packages: 240 },
  { day: "Thu", orders: 380, packages: 230 },
  { day: "Fri", orders: 390, packages: 320 }
]

const defaultPackageData = [
  { name: "Millad Special", value: 30 },
  { name: "Nikah", value: 15 },
  { name: "Majlis", value: 20 },
  { name: "Others", value: 35 }
]


const defaultRecentIncome = [
  { name: "Package 1", date: "28 January 2025", amount: "+Rs. 230k" },
  { name: "Walima", date: "28 January 2025", amount: "+Rs. 20k" },
  { name: "Grand Walima", date: "28 January 2025", amount: "+Rs. 100k" }
]

const defaultPaymentHistory = [
  {
    description: "Package 1",
    orderId: "#12548796",
    type: "COD",
    date: "28 Jan, 12:30 AM",
    amount: "+Rs. 2,000",
    receipt: true
  }
]

const COLORS = ["#9E033B", "#BF0644", "#ED004F", "#E5024E"]

export default function TrackPaymentsPage({
  monthlyData = defaultMonthlyData,
  weeklyData = defaultWeeklyData,
  packageData = defaultPackageData,
  recentIncome = defaultRecentIncome,
  paymentHistory = defaultPaymentHistory
}) {
  return (
    <div className="w-full min-h-screen bg-white lg:p-6 p-2">

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Monthly Income */}
        <div className="bg-white rounded-2xl lg:p-4 flex flex-col w-full lg:w-160 ">
          <div className="text-lg font-bold text-pink-700 mb-2">Monthly Income</div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E5024E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#E5024E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2C4C7" />
                <XAxis dataKey="month" tick={{ fill: '#E5024E', fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#E5024E', fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#F2C4C7' }} />
                <Line
                  type="monotone"
                  dataKey="Income"
                  stroke="#E5024E"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#E5024E' }}
                  activeDot={{ r: 7 }}
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Income */}
        <div className="bg-white rounded-2xl lg:p-6 flex flex-col lg:justify-between min-h-[250px] w-full lg:w-[351.8px]">
          <div className="text-lg font-bold text-pink-700 mb-4">Recent Income</div>
          <div className="space-y-6 shadow-lg rounded-xl p-4 bg-white">
            {recentIncome.map((item, idx) => (
              <div className="flex items-center justify-between" key={idx}>
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-xs text-pink-300">{item.date}</p>
                </div>
                <p className="font-semibold text-emerald-500">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
              </div>

              <br />



 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">


        {/* Weekly Activity */}
        <div className="rounded-2xl lg:p-4 p-2 w-full lg:w-160 flex flex-col bg-white">
          <div className="text-lg font-bold text-pink-700 mb-2">Weekly Activity</div>
          <div className="flex-1 bg-pink-50 lg:p-6 p-2 rounded-2xl">
            <div className="flex justify-end items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[#D42D69] rounded-full"></div> <span className="text-xs text-pink-600">Orders</span>
              <div className="w-3 h-3 bg-[#EE6295] rounded-full"></div> <span className="text-xs text-pink-600">Packages</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={weeklyData}
                barCategoryGap={30}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="0" stroke="#FAD1DF" />
                <XAxis dataKey="day" tick={{ fill: '#EE6295', fontWeight: 400 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#EE6295', fontWeight: 400 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#F2C4C7' }} />
                <Bar dataKey="orders" fill="#D42D69" radius={[8, 8, 8, 8]} barSize={12} />
                <Bar dataKey="packages" fill="#EE6295" radius={[8, 8, 8, 8]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income by Packages */}
        <div className="bg-white rounded-2xl lg:p-6 flex flex-col w-full lg:w-90 ">
          <div className="text-lg font-bold text-pink-700 mb-2">Income by Packages</div>
          <div className="flex-1 rounded-2xl lg:p-6 bg-pink-50">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={packageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x - 4}
                        y={y - 12}
                        fill="#fff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontWeight="bold"
                        fontSize={14}
                      >
                        {`${packageData[index].value}%`}
                        <tspan x={x} dy="1.2em" fontSize={12}>{packageData[index].name}</tspan>
                      </text>
                    );
                  }}
                  outerRadius={120}
                  innerRadius={0}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="#fdf2f8"
                  strokeWidth={6}
                  isAnimationActive={true}
                >
                  {packageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

 </div>
      {/* Payment History */}
      <div className="mt-8 rounded-2xl p-2 w-full">
        <div className="text-lg font-bold text-pink-700 mb-2">Payment History</div>
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-[#FFF5F6] border-b-2 border-pink-100">
                <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Description</th>
                <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Order ID</th>
                <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Type</th>
                <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Date</th>
                <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Amount</th>
                <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((row, idx) => (
                <tr className="bg-[#FFF5F6]" key={idx}>
                  <td className="py-3 px-4 font-medium text-black">{row.description}</td>
                  <td className="py-3 px-4 text-gray-500">{row.orderId}</td>
                  <td className="py-3 px-4 text-gray-500">{row.type}</td>
                  <td className="py-3 px-4 text-gray-500">{row.date}</td>
                  <td className="py-3 px-4 text-emerald-500 font-semibold">{row.amount}</td>
                  <td className="py-3 px-4">
                    {row.receipt && (
                      <button className="flex items-center gap-2 px-4 py-1 border border-[#ED004F] text-[#ED004F] rounded-full hover:bg-pink-50 transition font-semibold">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
